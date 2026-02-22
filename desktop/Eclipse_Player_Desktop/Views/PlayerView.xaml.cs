using Eclipse_Player_Desktop.Views.Player;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media.Imaging;
using System;

namespace Eclipse_Player_Desktop.Views;

public sealed partial class PlayerView : UserControl
{
    public PlayerView()
    {
        this.InitializeComponent();
                
        var logo = new Image
        {
            Width = 235,
            Height = 235,
            Source = new BitmapImage(new Uri("ms-appx:///Assets/images/logo.png")),
            HorizontalAlignment = HorizontalAlignment.Center,
            VerticalAlignment = VerticalAlignment.Top,
            Margin = new Thickness(0, -10, 0, 0)
        };
        RootGrid.Children.Add(logo);
                
        var audioPlayer = new AudioPlayerView
        {
            HorizontalAlignment = HorizontalAlignment.Center,
            VerticalAlignment = VerticalAlignment.Center,
            Width = 500,
            Height = 200
        };
        RootGrid.Children.Add(audioPlayer);
    }
}

