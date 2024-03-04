import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: "test1i5xjlcvt9cw53flv3kof" },
    create: {
      id : 'test1i5xjlcvt9cw53flv3kof',
      email : 'test1@toto.fr',
      name: 'Toto',
      latitude: 50.641436001689726,
      longitude: 3.0447324484364815,
      player: {
        create: {
          isPlaying: true,
          progress: 0,
          duration: 199044,
          dateAppel: "1702229982129",
          track: {
            create: {
              songId: "1t5iJM2mXNrLclz7lFedcD",
              artistes: ["Bekar", "MJ"],
              name: "Brûle dans le silence",
              imageURL:
                "https://i.scdn.co/image/ab67616d0000b273be0e2af742578f7dbea16947",
            },
          },
        },
      },
    },
    update: {},
  });
  /* await prisma.user.create({
    data:  {
      idSong: '0ghflGGfVvifD3szXw4LwO',
      artistes: [],
      name: 'Told you so',
      urlImageAlbum: 'https://i.scdn.co/image/ab67616d0000b2734f0b0250f2b12bc669e47749',
      progress: 0,
      duration:  289946,
      dateCall: '1702129820957',
      latitude: 50.63929054840681, 
      longitude: 3.0626563298909524,
    }
  }) */
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
