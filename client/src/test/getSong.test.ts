import { describe, it, expect } from 'vitest'
import { getSongData, getSongTitle } from '@/utils/getSong'
import type { Song } from '@/types/songs.types'

const songs: Song[] = [
    {"id":1,"title":"Leap Of Faith","artist":"Neperia","album":"Re:Drawing New Worlds","year":2024,"image":"https://res.cloudinary.com/dxxlzccju/image/upload/v1778587445/Re-Drawing_New_Worlds_nv1an2.jpg","url":"https://res.cloudinary.com/dxxlzccju/video/upload/v1761067056/Leap_Of_Faith_xdphbg.mp3","type":"album","duration":60,"averageColor":"#e3e1eb","lyrics":"Instrumental","imageHQ":"https://res.cloudinary.com/dxxlzccju/image/upload/v1768317856/Re-Drawing_New_Worlds_fk4urz.jpg","loudness":{"truePeak":-3.27,"lufsRange":3.9,"integratedLufs":-16.8},"artists":[{"name":"Neperia","role":"main"}]},
    {"id":2,"title":"Drawing New Worlds","artist":"Neperia","album":"Re:Drawing New Worlds","year":2024,"image":"https://res.cloudinary.com/dxxlzccju/image/upload/v1778587445/Re-Drawing_New_Worlds_nv1an2.jpg","url":"https://res.cloudinary.com/dxxlzccju/video/upload/v1761067198/Drawing_New_Worlds_euhoh5.mp3","type":"album","duration":282,"averageColor":"#e3e1eb","lyrics":"Design the flow, the currents of time\r\nRemake a world, rejoice the life\r\nUse the art that your mind provides\r\nSolve the questions of your life\r\n\r\nLet yourself to fall in this flood of emotions\r\nYou leave behind a world that’s dead\r\ndead for you\r\n\r\nDraw new worlds from a broken memory\r\n(Chaos rises while you lose your cause)\r\nObserve with hope your dreams come true\r\n(Mesmerized and lost)\r\nPaint new words from zero point to nothingness\r\n(Death approaches calculate the cost)\r\nResign from pain your mind is plain\r\n(Mesmerized and lost)\r\n\r\nLurk for the chance or define the fate\r\nIt’s all yours the choice to make\r\nDye the sky, dye the sea\r\nIt’s the place you want to live\r\n\r\nDraw new worlds from a broken memory\r\n(Chaos rises while you lose your cause)\r\nObserve with hope your dreams come true\r\n(Mesmerized and lost)\r\nPaint new words from zero point to nothingness\r\n(Death approaches calculate the cost)\r\nResign from pain your mind is plain\r\n(Mesmerized and lost)\r\n\r\nYou leave behind a world that’s dead\r\ndead for you\r\n","imageHQ":"https://res.cloudinary.com/dxxlzccju/image/upload/v1768317856/Re-Drawing_New_Worlds_fk4urz.jpg","loudness":{"truePeak":-0.16,"lufsRange":4.3,"integratedLufs":-8},"artists":[{"name":"Neperia","role":"main"}]},  
]

describe('getSongTitle', () => {
    it('returns the song title for a matching song id', () => {
        expect(getSongTitle(1, songs)).toBe('Leap Of Faith');
    });

    it('returns default when NO matching song id', () => {
        expect(getSongTitle(3, songs)).toBe('Song #3');
    });

    it('returns "Missing Song ID" when NO input', () => {
        expect(getSongTitle()).toBe('Missing Song ID');
    });

    it('returns "Missing Songs Library" when NO songs', () => {
        expect(getSongTitle(3, [])).toBe('Missing Songs Library');
    });
});

describe('getSongData', () => {
    it('returns the song for a matching song id', () => {
        expect(getSongData(1, songs)).toBe(songs[0]);
    });    

    it('returns null when NO matching song id', () => {
        expect(getSongData(3, songs)).toBe(null);
    });

    it('returns null when NO songs', () => {
        expect(getSongData(3, [])).toBe(null);
    });

    it('returns null when NO input', () => {
        expect(getSongData()).toBe(null);
    });
});

