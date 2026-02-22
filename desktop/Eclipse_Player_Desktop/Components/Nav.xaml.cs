using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;

namespace Eclipse_Player_Desktop.Components
{
    public sealed partial class Nav : UserControl
    {
        public event RoutedEventHandler? HomeClicked;
        public event RoutedEventHandler? PlayerClicked;
        public event RoutedEventHandler? LibraryClicked;

        public Nav()
        {
            this.InitializeComponent();
                    
            AddHoverEffect(HomeButton);
            AddHoverEffect(PlayerButton);
            AddHoverEffect(LibraryButton);

            HomeButton.Click += (s, e) => HomeClicked?.Invoke(s, e);
            PlayerButton.Click += (s, e) => PlayerClicked?.Invoke(s, e);
            LibraryButton.Click += (s, e) => LibraryClicked?.Invoke(s, e);
        }

        private void AddHoverEffect(Button btn)
        {
            btn.PointerEntered += (s, e) =>
            {
                if (btn.Content is Image img) img.Opacity = 1.0;
            };

            btn.PointerExited += (s, e) =>
            {
                if (btn.Content is Image img) img.Opacity = 0.5;
            };
        }
    }
}
