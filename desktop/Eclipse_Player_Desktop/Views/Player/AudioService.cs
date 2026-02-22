namespace Eclipse_Player_Desktop
{
    public sealed class AudioService
    {
        public static AudioService Instance { get; } = new AudioService();

        public string Title { get; private set; } = "Song Title";
        public string Artist { get; private set; } = "Artist Name";
        public string ImageUri { get; private set; } =
            "ms-appx:///Assets/images/HomeLogo.png";

        public double Duration { get; private set; } = 240;
        public double Position { get; private set; }
        public double Volume { get; private set; } = 0.5;

        public bool IsPlaying { get; private set; }

        public void TogglePlay() => IsPlaying = !IsPlaying;
        public void Stop() { IsPlaying = false; Position = 0; }
        public void Next() { Position = 0; }
        public void Previous() { Position = 0; }

        public void Seek(double value) => Position = value;
        public void SetVolume(double value) => Volume = value;
    }
}
