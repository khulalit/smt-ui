// format.test.ts
import { describe, expect, it } from 'vitest';
import { formatCurrency } from './format';

describe('formatCurrency', () => {
    it('formats positive numbers as USD currency', () => {
        expect(formatCurrency(1000)).toBe('$1,000');
    });

    it('formats large numbers correctly', () => {
        expect(formatCurrency(1750000)).toBe('$1,750,000');
    });

    it('rounds decimal values', () => {
        expect(formatCurrency(999.99)).toBe('$1,000');
    });

    it('formats zero correctly', () => {
        expect(formatCurrency(0)).toBe('$0');
    });

    it('formats negative values correctly', () => {
        expect(formatCurrency(-5000)).toBe('-$5,000');
    });
});