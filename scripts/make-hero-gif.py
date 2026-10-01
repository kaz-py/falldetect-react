"""Turn the supplied cyber video into FallDetect's blue hero GIF.

Requires Pillow and ffmpeg. Remotion's bundled Windows ffmpeg is used when present.
The source MP4 stays in the system temporary directory, outside the site bundle.
"""

from pathlib import Path
from shutil import which
from subprocess import run
from tempfile import TemporaryDirectory, gettempdir
from urllib.request import urlretrieve

from PIL import Image


SOURCE_URL = (
    "https://d8j0ntlcm91z4.cloudfront.net/"
    "user_38xzZboKViGWJOttwIXH07lWA1P/"
    "hf_20260809_132544_b6ef0174-ed95-45ad-9a2f-ccb8acfbdce8.mp4"
)
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "img"
SIZE = (1024, 768)
FPS = 10
FRAME_COUNT = 100


def ffmpeg_binary():
    bundled = ROOT / "fall-detect-video" / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"
    if bundled.is_file():
        return str(bundled)
    system = which("ffmpeg")
    if system:
        return system
    raise RuntimeError("ffmpeg is required to regenerate the hero GIF")


def recolor(frame):
    hue, saturation, value = frame.convert("RGB").convert("HSV").split()
    # Red graphics become cool blue, while neutral white/black details remain neutral.
    hue = hue.point(lambda channel: (channel + 145) % 256)
    saturation = saturation.point(lambda channel: round(channel * 0.7))
    return Image.merge("HSV", (hue, saturation, value)).convert("RGB")


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    source = Path(gettempdir()) / "falldetect-cyber-source.mp4"
    if not source.is_file():
        urlretrieve(SOURCE_URL, source)

    with TemporaryDirectory(prefix="falldetect-gif-") as folder:
        frames_dir = Path(folder)
        run(
            [
                ffmpeg_binary(), "-y", "-loglevel", "error", "-i", str(source),
                "-an", "-vf", f"scale={SIZE[0]}:{SIZE[1]}:flags=lanczos",
                "-r", str(FPS), "-frames:v", str(FRAME_COUNT),
                str(frames_dir / "frame-%03d.png"),
            ],
            check=True,
        )
        files = sorted(frames_dir.glob("frame-*.png"))
        if len(files) != FRAME_COUNT:
            raise RuntimeError(f"Expected {FRAME_COUNT} frames, found {len(files)}")

        frames = [recolor(Image.open(path)) for path in files]
        frames[15].save(OUTPUT / "hero-scan-poster.png", optimize=True)

        # One shared palette avoids color flicker from frame to frame.
        samples = Image.new("RGB", (SIZE[0], SIZE[1]))
        for sample_index, frame in enumerate(frames[::10]):
            samples.paste(frame.resize((SIZE[0] // 4, SIZE[1] // 4)),
                          ((sample_index % 4) * (SIZE[0] // 4),
                           (sample_index // 4) * (SIZE[1] // 4)))
        palette = samples.quantize(colors=96, method=Image.Quantize.FASTOCTREE)
        indexed = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
        indexed[0].save(
            OUTPUT / "hero-scan.gif", save_all=True, append_images=indexed[1:],
            duration=round(1000 / FPS), loop=0, optimize=True, disposal=2,
        )


if __name__ == "__main__":
    main()
