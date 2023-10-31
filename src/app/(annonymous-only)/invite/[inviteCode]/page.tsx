import {
  SignupInviteResponse,
  SignupInviteResponseModel,
} from "@/domain/signup/models";
import { signUpInviteService } from "@/domain/signup/services";
import { SignupInviteFeature } from "@/features/Signup/components/SignupInvite/SignupInviteFeature";
import { assertDecode } from "@/lib/helpers/asserDecode";
import { redirect } from "next/navigation";

interface SignupInvitePageProps {
  params: {
    inviteCode: string;
  };
}

async function getSignUpInviteData(
  code: string
): Promise<SignupInviteResponse> {
  const res = await signUpInviteService.getSignupInviteData(code);

  if (!res.ok) {
    redirect("/404");
  }

  return assertDecode(
    SignupInviteResponseModel.decode(await res.json()),
    "Failed to decode SignupInviteResponseModel"
  );
}

export default async function SignupInvitePage({
  params,
}: SignupInvitePageProps) {
  const inviteData = await getSignUpInviteData(params.inviteCode);
  console.log(inviteData);
  return (
    <main className="m-4">
      <div className="w-full">
        <SignupInviteFeature inviteData={inviteData}/>
      </div>
    </main>
  );
}
