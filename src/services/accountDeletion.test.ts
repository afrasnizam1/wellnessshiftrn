const callOrder: string[] = [];

const mockFirestoreDelete = jest.fn(async () => {
  callOrder.push('firestore');
});

const mockAuthDelete = jest.fn(async () => {
  callOrder.push('auth');
});

const mockEmptySnap = { empty: true, docs: [] as unknown[], size: 0 };

jest.mock('@react-native-firebase/firestore', () => {
  const firestore = () => ({
    collection: () => ({
      doc: () => ({
        delete: mockFirestoreDelete,
        collection: () => ({
          limit: () => ({
            get: async () => mockEmptySnap,
          }),
        }),
      }),
    }),
    batch: () => ({
      delete: jest.fn(),
      commit: async () => undefined,
    }),
  });
  return { __esModule: true, default: firestore };
});

jest.mock('@react-native-firebase/auth', () => {
  const auth = () => ({
    currentUser: {
      uid: 'user-1',
      delete: mockAuthDelete,
    },
  });
  return { __esModule: true, default: auth };
});

jest.mock('./firebaseReady', () => ({
  isFirebaseReady: () => true,
}));

jest.mock('./authSession', () => ({
  signOutCurrentUser: jest.fn(async () => undefined),
}));

import { deleteCurrentUserAccount } from './accountDeletion';

describe('deleteCurrentUserAccount', () => {
  beforeEach(() => {
    callOrder.length = 0;
    mockFirestoreDelete.mockClear();
    mockAuthDelete.mockClear();
    mockAuthDelete.mockImplementation(async () => {
      callOrder.push('auth');
    });
  });

  it('deletes Firestore data before Auth deletion', async () => {
    await deleteCurrentUserAccount();
    expect(mockFirestoreDelete).toHaveBeenCalled();
    expect(mockAuthDelete).toHaveBeenCalledTimes(1);
    expect(callOrder.indexOf('firestore')).toBeGreaterThanOrEqual(0);
    expect(callOrder.indexOf('firestore')).toBeLessThan(callOrder.indexOf('auth'));
  });

  it('throws a friendly error when Auth requires a recent login', async () => {
    mockAuthDelete.mockRejectedValueOnce({ code: 'auth/requires-recent-login' });
    await expect(deleteCurrentUserAccount()).rejects.toThrow(
      'For security, please sign out, sign back in, then try deleting your account again.',
    );
  });
});
