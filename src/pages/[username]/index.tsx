import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { MapView } from "~/components/mapview";
import { ProfileBarWrapper } from "~/components/profile/profile-bar-wrapper";
import ProfileDrawer from "~/components/profile/profile-drawer";
import { ProfileProvider } from "~/components/profile/profile-provider";
import { TimelineSlider } from "~/components/profile/timeline-slider";
import { redirect } from "~/utils/redirect";

type Props = { username: string; showProfile: boolean };

export const getServerSideProps = (async ({ params, query, res }) => {
  const username = String(params?.username ?? "");
  const showProfile = query?.profile !== undefined;

  if (!username.startsWith("@")) redirect(res, "/404");

  // TODO: check if user exusts

  return { props: { username, showProfile } };
}) satisfies GetServerSideProps<Props>;

const ProfilePage = ({
  username,
  showProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ProfileProvider initialState={{ showProfile, username }}>
      <MapView />
      <ProfileBarWrapper />
      <TimelineSlider />
      <ProfileDrawer />
    </ProfileProvider>
  );
};

export default ProfilePage;