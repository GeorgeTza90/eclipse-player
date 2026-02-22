using Microsoft.UI;
using System;
using Windows.UI;

namespace Eclipse_Player_Desktop.Utils
{
    public static class ColorHelper
    {
        /// <summary>
        /// Μετατρέπει hex string (#RRGGBB ή #AARRGGBB) σε Color.
        /// Αν δεν υπάρχει Alpha, βάζει 255 (πλήρως αδιαφανές)
        /// </summary>
        /// <param name="hex">Hex string χρώματος</param>
        /// <returns>Windows.UI.Color</returns>
        public static Color FromHex(string hex)
        {
            if (string.IsNullOrWhiteSpace(hex))
                return Colors.Black;

            hex = hex.TrimStart('#');

            byte a = 255;
            byte r = 0;
            byte g = 0;
            byte b = 0;

            if (hex.Length == 6)
            {
                r = Convert.ToByte(hex.Substring(0, 2), 16);
                g = Convert.ToByte(hex.Substring(2, 2), 16);
                b = Convert.ToByte(hex.Substring(4, 2), 16);
            }
            else if (hex.Length == 8)
            {
                a = Convert.ToByte(hex.Substring(0, 2), 16);
                r = Convert.ToByte(hex.Substring(2, 2), 16);
                g = Convert.ToByte(hex.Substring(4, 2), 16);
                b = Convert.ToByte(hex.Substring(6, 2), 16);
            }
            else
            {
                // Λάθος μορφή, επιστρέφει μαύρο
                return Colors.Black;
            }

            return Color.FromArgb(a, r, g, b);
        }
    }
}
