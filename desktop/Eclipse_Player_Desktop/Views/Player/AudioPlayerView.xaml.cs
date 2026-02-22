using System;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media.Imaging;

namespace Eclipse_Player_Desktop.Views.Player;

public sealed partial class AudioPlayerView : UserControl
{
    public AudioPlayerView()
    {
        this.InitializeComponent();

        // Example: Load default song image and text
        SongImage.Source = new BitmapImage(new Uri("ms-appx:///Assets/images/NoImage.png"));
        SongTitle.Text = "Song Title";
        SongArtist.Text = "Artist Name";

        // Hook up buttons
        PlayPauseButton.Click += (s, e) => PlayPause();
        StopButton.Click += (s, e) => Stop();
        NextButton.Click += (s, e) => Next();
        PrevButton.Click += (s, e) => Previous();
        VolMinButton.Click += (s, e) => SetVolume(0);
        VolMaxButton.Click += (s, e) => SetVolume(1);
    }

    private void PlayPause()
    {
        // Toggle play/pause logic
        PlayPauseButton.Content = PlayPauseButton.Content.ToString() == "▶" ? "⏸" : "▶";
    }

    private void Stop() { /* Stop logic */ }
    private void Next() { /* Next logic */ }
    private void Previous() { /* Previous logic */ }

    private void SetVolume(double vol)
    {
        VolumeSlider.Value = vol;
        // Set AudioService volume
    }
}
