import { describe, it, expect } from 'vitest'
import type { ArtistRole, GroupedArtists } from '@/types/artists.types'
import { groupArtistsByRole } from '@/utils/groupArtistsByRole'

const artists: ArtistRole[] = [
    { name: 'Neperia', role: 'main' },
    { name: 'Mapa', role: 'feat' },
]

const result: GroupedArtists = {
    mainArtists: ['Neperia'],
    featArtists: ['Mapa'],
}

describe('groupArtistsByRole', () => {
    it('returns correctly the groups', () => {
        expect(groupArtistsByRole(artists)).toEqual(result);
    });

    it('groups multiple main artists', () => {
        const artists: ArtistRole[] = [
            { name: 'Neperia', role: 'main' },
            { name: 'Pits', role: 'main' },
            { name: 'Mapa', role: 'feat' },
        ]

        expect(groupArtistsByRole(artists)).toEqual({
            mainArtists: ['Neperia', 'Pits'],
            featArtists: ['Mapa'],
        })
    })

    it('groups multiple featured artists', () => {
        const artists: ArtistRole[] = [
            { name: 'Neperia', role: 'main' },
            { name: 'Mapa', role: 'feat' },
            { name: 'pits', role: 'feat' },
        ]

        expect(groupArtistsByRole(artists)).toEqual({
            mainArtists: ['Neperia'],
            featArtists: ['Mapa', 'pits'],
        })
    })

    it('works with only a main artist', () => {
        expect(
            groupArtistsByRole([
                { name: 'Neperia', role: 'main' },
            ])
        ).toEqual({
            mainArtists: ['Neperia'],
            featArtists: [],
        })
    })

    it('throws when there is NO main artist', () => {
        expect(() => groupArtistsByRole())
        .toThrow('Song must have at least 1 Main Artist');
    });

    it('throws when there are only featured artists', () => {
        expect(() => groupArtistsByRole([
            { name: 'Mapa', role: 'feat' },
        ]))
        .toThrow('Song must have at least 1 Main Artist');
    });

    it('ignores unsupported artist roles', () => {
        const artists = [
            { name: 'Neperia', role: 'main' },
            { name: 'Someone', role: 'producer' },
        ] as ArtistRole[]

        expect(groupArtistsByRole(artists))
        .toEqual({
            mainArtists: ['Neperia'],
            featArtists: [],
        });
    });

    it('does not duplicate artists', () => {
        expect(groupArtistsByRole([
            { name: 'Neperia', role: 'main' },
            { name: 'Neperia', role: 'main' },
        ]))
        .toEqual({
            mainArtists: ['Neperia'],
            featArtists: [],
        });
    });
});