using Microsoft.UI;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Windows.UI;

namespace Eclipse_Player_Desktop.Components
{
    public sealed partial class Circle : UserControl
    {
        public Circle()
        {
            this.InitializeComponent();
            this.Loaded += Circle_Loaded;
            this.SizeChanged += (s, e) => UpdateCircle();
        }

        private void Circle_Loaded(object sender, RoutedEventArgs e)
        {
            UpdateCircle();
        }

        #region Dependency Properties

        public double Size
        {
            get => (double)GetValue(SizeProperty);
            set => SetValue(SizeProperty, value);
        }
        public static readonly DependencyProperty SizeProperty =
            DependencyProperty.Register(nameof(Size), typeof(double), typeof(Circle), new PropertyMetadata(200.0, OnPropertyChanged));

        public double Top
        {
            get => (double)GetValue(TopProperty);
            set => SetValue(TopProperty, value);
        }
        public static readonly DependencyProperty TopProperty =
            DependencyProperty.Register(nameof(Top), typeof(double), typeof(Circle), new PropertyMetadata(0.0, OnPropertyChanged));

        public Color Color1
        {
            get => (Color)GetValue(Color1Property);
            set => SetValue(Color1Property, value);
        }
        public static readonly DependencyProperty Color1Property =
            DependencyProperty.Register(nameof(Color1), typeof(Color), typeof(Circle), new PropertyMetadata(Colors.Black, OnPropertyChanged));

        public Color Color2
        {
            get => (Color)GetValue(Color2Property);
            set => SetValue(Color2Property, value);
        }
        public static readonly DependencyProperty Color2Property =
            DependencyProperty.Register(nameof(Color2), typeof(Color), typeof(Circle), new PropertyMetadata(Colors.DarkGray, OnPropertyChanged));

        public string Color1Hex
        {
            get => Color1.ToString();
            set => Color1 = Eclipse_Player_Desktop.Utils.ColorHelper.FromHex(value);
        }

        public string Color2Hex
        {
            get => Color2.ToString();
            set => Color2 = Eclipse_Player_Desktop.Utils.ColorHelper.FromHex(value);
        }

        #endregion

        private static void OnPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is Circle c)
                c.UpdateCircle();
        }

        private void RootCanvas_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            UpdateCircle();
        }

        public double CircleOpacity
        {
            get => (double)GetValue(CircleOpacityProperty);
            set => SetValue(CircleOpacityProperty, value);
        }

        public static readonly DependencyProperty CircleOpacityProperty =
            DependencyProperty.Register(
                nameof(CircleOpacity),
                typeof(double),
                typeof(Circle),
                new PropertyMetadata(1.0, OnOpacityChanged)); // default 1 = fully visible

        private static void OnOpacityChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is Circle c && c.CircleEllipse != null)
            {
                c.CircleEllipse.Opacity = (double)e.NewValue;
            }
        }


        private void UpdateCircle()
        {
            if (RootCanvas.ActualWidth == 0 || RootCanvas.ActualHeight == 0) return;

            // Main Circle
            CircleEllipse.Width = Size;
            CircleEllipse.Height = Size;
            CircleEllipse.Fill = new LinearGradientBrush
            {
                StartPoint = new Windows.Foundation.Point(0, 0),
                EndPoint = new Windows.Foundation.Point(1, 1),
                GradientStops = new GradientStopCollection
                {
                    new GradientStop { Color = Color1, Offset = 0 },
                    new GradientStop { Color = Color2, Offset = 1 }
                }
            };

            Canvas.SetLeft(CircleEllipse, (RootCanvas.ActualWidth - Size) / 2);
            Canvas.SetTop(CircleEllipse, Top);
        }
    }
}
