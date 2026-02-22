using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Media.Imaging;
using Microsoft.UI.Xaml.Navigation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;

namespace Eclipse_Player_Desktop.Views;

public sealed partial class HomeView : UserControl
{
    public HomeView()
    {
        var grid = new Grid();

        double verticalOffset = 6;

        var homeLogo = new Image
        {
            Width = 170,
            Height = 170,
            Source = new BitmapImage(new Uri("ms-appx:///Assets/images/HomeLogo.png")),
            HorizontalAlignment = HorizontalAlignment.Center,
            VerticalAlignment = VerticalAlignment.Top,
            Margin = new Thickness(0, verticalOffset, 0, 0)
        };

        grid.Children.Add(homeLogo);

        Content = grid;
    }
}
