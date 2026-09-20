import { describe, it, expect } from 'vitest';
import { formatTime, useAlbumDuration, formatDuration, formatMonth } from '@/utils/formatTime';
import { Song } from '@/types/songs.types';

describe('formatTime', () => {
  it('formats a typical duration correctly', () => {
    // Arrange
    const millis = 90000; // 1 minute 30 seconds

    // Act
    const result = formatTime(millis);

    // Assert
    expect(result).toBe('1:30');
  });

  it('pads seconds under 10 with a leading zero', () => {
    expect(formatTime(65000)).toBe('1:05'); // 65 sec = 1:05
  });

  it('returns "0:00" for zero', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('returns "0:00" for negative values', () => {
    expect(formatTime(-5000)).toBe('0:00');
  });

  it('does not format hours separately (documents current behavior)', () => {
    const oneHour = 3600000; // 1 hour in ms
    expect(formatTime(oneHour)).toBe('60:00');
  });

  it('does not format hours separatly (above hour content)', () => {
    expect(formatTime(3700000)).toBe('61:40');
  });
});

describe('useAlbumDuration', () => {
    it('formats a typical duration correctly', () => {        
        const mocksongs: Song[] = [
            {duration: 180} as Song,
            {duration: 240} as Song,
        ]        
        const result = useAlbumDuration(mocksongs);        
        expect(result).toBe('7m 0s');
    });  
    
    it('returns "0m 0s" for negative values', () => {
        expect(useAlbumDuration([
            {duration: -160} as Song,
            {duration: 200} as Song,
        ])).toBe('6m 0s');
    });

    it('returns "0m 0s" for zero', () => {
        expect(useAlbumDuration([
            {duration: 0} as Song,
            {duration: 0} as Song,
        ])).toBe('0m 0s');
    });

    it('returns "0m 0s" for undedine or null', () => {
        expect(useAlbumDuration([])).toBe('0m 0s');
        expect(useAlbumDuration([{} as Song])).toBe('0m 0s');
    });

    it('returns exactly 1 hour content', () => {
        expect(useAlbumDuration([
            {duration: 3600} as Song
        ])).toBe('1h 0m');
    });

    it('returns correctlry long hour content', () => {
        expect(useAlbumDuration([
            {duration: 216000} as Song
        ])).toBe('60h 0m');
    });
   

    it('returns correctly with Non-Floated duration', () => {
        expect(useAlbumDuration([
            {duration: 180.5} as Song,
            {duration: 240.72} as Song,
        ])).toBe("7m 1s");
    });
});

describe('formatDuration', () => {
    it('formats a typical duration correctly', () => {    
        const millis = 5400; // 1h 30m    
        const result = formatDuration(millis);
        expect(result).toBe('1h 30m');
    });

    it('pads seconds under 10 with a leading zero', () => {
        expect(formatDuration(3905)).toBe('1h 5m');
    });

    it('returns "0h 0m" for zero', () => {
        expect(formatDuration(0)).toBe('0h 0m');
    });

    it('returns "0h 0m" for negative values', () => {
        expect(formatDuration(-3600)).toBe('0h 0m');
    });

    it('does not format days separately (documents current behavior)', () => {
        const oneHour = 86400; // 24 hour in sec
        expect(formatDuration(oneHour)).toBe('24h 0m');
    });

    it('does not format hours separatly (above hour content)', () => {
        expect(formatDuration(90000)).toBe('25h 0m');
    });
});

describe('formatMonth', () => {
    it('formats a valid month-year string correctly', () => {
        expect(formatMonth('2026-03')).toBe('March 2026');
    });

    it('pads single-digit months correctly', () => {
        expect(formatMonth('2026-01')).toBe('January 2026');
    });

    it('handles December correctly (year-end edge case)', () => {
        expect(formatMonth('2025-12')).toBe('December 2025');
    });
});