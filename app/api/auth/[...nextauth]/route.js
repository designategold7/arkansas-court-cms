import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// These would be the actual Role IDs from your ASRP Discord Server settings
const ROLE_JUDGE = "1202416824390647859"; 
const ROLE_DA = "1205607888823783444", "1229502152255344661", "1229502152255344661";

const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,

      authorization: { params: { scope: 'identify guilds.members.read' } },
    }),
  ],
  callbacks: {

    async jwt({ token, account, profile }) {
      if (account) {
        token.id = profile.id;
        
        try {
          const guildId = process.env.DISCORD_GUILD_ID; 
          const response = await fetch(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          });

          const memberData = await response.json();
          
          // Assign access levels based on the roles returned by Discord
          if (memberData.roles && memberData.roles.includes(ROLE_JUDGE)) {
            token.accessLevel = 'Judge';
          } else if (memberData.roles && memberData.roles.includes(ROLE_DA)) {
            token.accessLevel = 'DistrictAttorney';
          } else {
            token.accessLevel = 'Civilian';
          }
        } catch (error) {
          console.error("Failed to fetch Discord roles", error);
          token.accessLevel = 'Civilian'; // Default to lowest permission on failure
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessLevel = token.accessLevel;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };