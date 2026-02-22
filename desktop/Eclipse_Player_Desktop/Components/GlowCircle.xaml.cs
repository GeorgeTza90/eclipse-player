using Microsoft.UI;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Shapes;
using Windows.UI;

namespace Eclipse_Player_Desktop.Components
{
    public sealed partial class GlowCircle : UserControl
    {
        public GlowCircle()
        {
            this.InitializeComponent();
            this.Loaded += GlowCircle_Loaded;
            this.SizeChanged += (s, e) => DrawGlow();
        }

        private void GlowCircle_Loaded(object sender, RoutedEventArgs e)
        {
            RootCanvas.SizeChanged += (s, ev) => DrawGlow();
            DrawGlow();
        }

        #region Dependency Properties

        public double Size
        {
            get => (double)GetValue(SizeProperty);
            set => SetValue(SizeProperty, value);
        }
        public static readonly DependencyProperty SizeProperty =
            DependencyProperty.Register(nameof(Size), typeof(double), typeof(GlowCircle), new PropertyMetadata(980.0, OnPropertyChanged));

        public double Top
        {
            get => (double)GetValue(TopProperty);
            set => SetValue(TopProperty, value);
        }
        public static readonly DependencyProperty TopProperty =
            DependencyProperty.Register(nameof(Top), typeof(double), typeof(GlowCircle), new PropertyMetadata(-820.0, OnPropertyChanged));

        public Color BaseColor
        {
            get => (Color)GetValue(BaseColorProperty);
            set => SetValue(BaseColorProperty, value);
        }
        public static readonly DependencyProperty BaseColorProperty =
            DependencyProperty.Register(nameof(BaseColor), typeof(Color), typeof(GlowCircle), new PropertyMetadata(Colors.LightGray, OnPropertyChanged));

        public double MaxOpacity
        {
            get => (double)GetValue(MaxOpacityProperty);
            set => SetValue(MaxOpacityProperty, value);
        }
        public static readonly DependencyProperty MaxOpacityProperty =
            DependencyProperty.Register(nameof(MaxOpacity), typeof(double), typeof(GlowCircle), new PropertyMetadata(0.18, OnPropertyChanged));

        public int LayerCount
        {
            get => (int)GetValue(LayerCountProperty);
            set => SetValue(LayerCountProperty, value);
        }
        public static readonly DependencyProperty LayerCountProperty =
            DependencyProperty.Register(nameof(LayerCount), typeof(int), typeof(GlowCircle), new PropertyMetadata(10, OnPropertyChanged));

        #endregion

        private static void OnPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is GlowCircle gc)
                gc.DrawGlow();
        }

        private void DrawGlow()
        {
            if (RootCanvas == null || RootCanvas.ActualWidth == 0) return;

            RootCanvas.Children.Clear();

            double opacityStep = MaxOpacity / LayerCount;

            for (int i = 0; i < LayerCount; i++)
            {
                double opacity = opacityStep * (i + 1);
                double topOffset = Top - i * 4; // adjust spacing between layers

                Ellipse ellipse = new Ellipse
                {
                    Width = Size,
                    Height = Size,
                    Fill = new SolidColorBrush(BaseColor),
                    Opacity = opacity
                };

                double left = (RootCanvas.ActualWidth - Size) / 2;
                Canvas.SetLeft(ellipse, left);
                Canvas.SetTop(ellipse, topOffset);

                RootCanvas.Children.Add(ellipse);
            }
        }
    }
}
