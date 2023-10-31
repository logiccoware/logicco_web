import { SignupInviteCard } from "@/features/Signup/components/SignupInvite/SignupInviteCard";
import { SignupInviteForm } from "@/features/Signup/components/SignupInvite/SignupInviteForm";
import { SignupInviteFeatureProps } from "@/features/Signup/components/SignupInvite/SignupInviteFeature/types";

export function SignupInviteFeature({ inviteData }: SignupInviteFeatureProps) {
  return (
    <SignupInviteCard>
      <SignupInviteForm inviteData={inviteData}/>
    </SignupInviteCard>
  );
}
