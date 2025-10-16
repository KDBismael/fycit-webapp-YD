# Authentication Workflow Implementation

## Overview
This document describes the Zustand-based authentication workflow implementation for signup, email verification, and password reset flows.

## Architecture

### Auth Store (`stores/authStore.ts`)
A centralized Zustand store that manages:
- User signup data (firstName, lastName, email, password)
- Auth context tracking ('signup' or 'password-reset')
- Email verification state
- Persistent storage using zustand/middleware persist

### Key Features
- **Context-aware routing**: Pages detect the auth context and route accordingly
- **Route protection**: Pages validate the auth context before rendering
- **Persistent state**: Auth state persists across page refreshes
- **Clean separation**: Each flow (signup, password-reset) is clearly separated

## User Flows

### 1. Signup Flow
```
/auth/signup
  ↓ [Store signup data + set context='signup']
/auth/verify-account
  ↓ [Verify OTP + set isEmailVerified=true]
/auth/signup/profile-completion
  ↓ [Fill profile form → Show modals on same page]
  ↓ [WelcomeModal → GuildVerificationModal → GuildVerificationForm → MembershipSummaryModal]
/dashboard
  ↓ [Reset auth store]
```

**Steps:**
1. User fills signup form → stores data in authStore
2. User enters OTP code → marks email as verified
3. User completes profile information form (guilds, locales, country, zip)
4. After form submission, modals appear on the same page:
   - WelcomeModal (optional, can skip)
   - GuildVerificationModal (if verifiable guilds selected)
   - GuildVerificationForm (for each guild to verify)
   - MembershipSummaryModal (after each guild verification)
5. User lands on dashboard → auth store is reset

### 2. Password Reset Flow
```
/auth/forgot-password
  ↓ [Store email + set context='password-reset']
/auth/verify-account
  ↓ [Verify OTP + set isEmailVerified=true]
/auth/create-password
  ↓ [Update password + reset auth store]
/auth/login
```

**Steps:**
1. User enters email → stores email and sets context
2. User enters OTP code → marks email as verified
3. User creates new password → resets auth store
4. User redirected to login page

## Route Protection

### `/auth/verify-account`
- **Required**: `authContext` must be 'signup' or 'password-reset'
- **Required**: `verificationEmail` must exist
- **Redirect**: `/auth/login` if validation fails

### `/auth/create-password`
- **Required**: `authContext` must be 'password-reset'
- **Redirect**: `/auth/login` if validation fails

### `/auth/signup/profile-completion`
- **Required**: `authContext` must be 'signup'
- **Required**: `isEmailVerified` must be true
- **Redirect**: `/auth/login` if validation fails
- **Note**: This page contains both the profile form and all verification modals

## State Management

### Auth Store State
```typescript
{
  signupData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } | null;
  
  authContext: 'signup' | 'password-reset' | null;
  verificationEmail: string | null;
  isEmailVerified: boolean;
  otpCode: string;
}
```

### Actions
- `setSignupData(data)` - Store user signup data
- `setAuthContext(context, email)` - Set auth flow context
- `setEmailVerified(verified)` - Mark email as verified
- `setOtpCode(code)` - Store OTP code
- `resetAuthStore()` - Clear all auth state

## File Changes

### Created Files
- `stores/authStore.ts` - New Zustand store for auth workflow

### Modified Files
- `app/auth/signup/page.tsx` - Integrated authStore
- `app/auth/verify-account/page.tsx` - Context-aware verification with routing
- `app/auth/forgot-password/page.tsx` - Set password-reset context
- `app/auth/create-password/page.tsx` - Context-aware password update
- `app/auth/signup/profile-completion/page.tsx` - Integrated workflow modals directly on the page
- `app/auth/signup/workflow/page.tsx` - **DEPRECATED** - Logic moved to profile-completion page

## Testing Recommendations

### Signup Flow Test
1. Navigate to `/auth/signup`
2. Fill form and submit
3. Verify redirect to `/auth/verify-account`
4. Enter OTP code
5. Verify redirect to `/auth/signup/profile-completion`
6. Fill profile completion form (guilds, locales, country, zip)
7. Submit form
8. Verify modals appear on the same page:
   - WelcomeModal appears first
   - Click "Start Verification" → GuildVerificationModal appears
   - Click "Next" → GuildVerificationForm appears
   - Fill verification form → MembershipSummaryModal appears
   - Click "Go to dashboard" or "Continue"
9. Verify redirect to `/dashboard`
10. Verify auth store is cleared

### Password Reset Flow Test
1. Navigate to `/auth/forgot-password`
2. Enter email and submit
3. Verify redirect to `/auth/verify-account`
4. Enter OTP code
5. Verify redirect to `/auth/create-password`
6. Create new password
7. Verify redirect to `/auth/login`
8. Verify auth store is cleared

### Route Protection Test
1. Try to access `/auth/verify-account` directly → should redirect to `/auth/login`
2. Try to access `/auth/create-password` directly → should redirect to `/auth/login`
3. Try to access `/auth/signup/profile-completion` directly → should redirect to `/auth/login`

## Notes
- Auth state persists in localStorage via zustand persist middleware
- State is automatically cleared after successful completion of any flow
- All routes are protected and validate context before rendering
- Email is displayed in verify-account page for better UX

