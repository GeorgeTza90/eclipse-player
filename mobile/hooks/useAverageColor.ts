import { useEffect, useState } from 'react';
import ImageColors from 'react-native-image-colors';

export function useAverageColor(uri: any, fallback = '#bebebe', dep?: string | number) {
    const [color, setColor] = useState(fallback);

    useEffect(() => {
        let mounted = true;
        if (!uri) return setColor(fallback);

        (async () => {
            try {
                const assetUri = typeof uri === 'number' ? Image.resolveAssetSource(uri).uri : uri;
                const result = await ImageColors.getColors(assetUri, {
                    fallback,
                    cache: true,
                    key: dep?.toString(),
                });

                if (!mounted) return;

                switch (result.platform) {
                    case 'android':
                        setColor(result.dominant || fallback);
                        break;
                    case 'ios':
                        setColor(result.background || fallback);
                        break;
                    case 'web':
                        setColor(result.lightVibrant || fallback);
                        break;
                    default:
                        setColor(fallback);
                }
            } catch (err) {
                console.warn('useAverageColor error', err);
                if (mounted) setColor(fallback);
            }
        })();

        return () => { mounted = false; };
    }, [uri, dep]);

    return color;
}
