import { SignupInviteCard } from "@/features/SignupInvite/components/SignupInviteCard";
import { SignupInviteForm } from "@/features/SignupInvite/components/SignupInviteForm";
import { SignupInviteFeatureProps } from "@/features/SignupInvite/components/SignupInviteFeature/types";

export function SignupInviteFeature({ inviteData }: SignupInviteFeatureProps) {
  return (
    <SignupInviteCard>
      <SignupInviteForm inviteData={inviteData}/>
    </SignupInviteCard>
  );
}
