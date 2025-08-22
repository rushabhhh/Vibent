// Simple jest scaffold — run with `npm test` (add jest config if missing)
import { createOrganizationWithOwner } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase';

jest.mock('@/lib/supabase', () => {
  const actual = jest.requireActual('@/lib/supabase');
  return {
    ...actual,
    supabaseAdmin: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue(null),
      single: jest.fn().mockResolvedValue({ data: { id: 'org-1', name: 'Test', domain: 't.test' } }),
    },
  };
});

describe('createOrganizationWithOwner', () => {
  it('throws if missing args', async () => {
    await expect(createOrganizationWithOwner(null, {})).rejects.toThrow('address required');
    await expect(createOrganizationWithOwner('0x1', {})).rejects.toThrow('name and domain required');
  });

  it('creates org when data valid', async () => {
    // With the mocked supabaseAdmin above, should resolve
    // Provide minimal valid input
    await expect(createOrganizationWithOwner('0x1', { name: 'T', domain: 't.test' })).resolves.toHaveProperty('organization');
  });
});