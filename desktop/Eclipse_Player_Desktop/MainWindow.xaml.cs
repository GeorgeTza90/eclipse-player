using Microsoft.UI.Xaml;
using Eclipse_Player_Desktop.Views;

namespace Eclipse_Player_Desktop
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();                        
            MainFrame.Content = new HomeView();
        }

        private void HomeButton_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Content = new HomeView();
        }

        private void PlayerButton_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Content = new PlayerView();
        }

        private void LibraryButton_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Content = new LibraryView();
        }
    }
}
