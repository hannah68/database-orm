const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    email: 'alice@gmail.come',
                    phone: '+44 7687532465',
                }
            }
        }
    });
    console.log('Customer created', createdCustomer);

    // create contact===================================
    // const createdContact = await prisma.contact.create({
    //     data: {
    //         email: 'alice@gmail.come',
    //         phone: '+44 7687532465',
    //     }
    // })
    // console.log('contact created', createdContact);



    // create movie======================================
    const createdMovie = await prisma.movie.create({
        data: {
            title: 'Breaking bad',
            runtimeMins: 90,
        }
    })
    console.log('movie created', createdMovie);

    // create screen=====================================
    const createdScreen = await prisma.screen.create({
        data: {
            number: 1,
        }
    })
    console.log('screen created', createdScreen);

    // create screening==================================
    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: new Date('August 19, 2022 20:15:30'),
            movie: {
                connect: {
                    id: createdMovie.id
                }
            },
            screen: {
                connect: {
                    id: createdScreen.id
                }
            }
        }
    })
    console.log('screening created', createdScreening);

    // create ticket=======================================
    const createTicket = await prisma.ticket.create({
        data: {
            customers: {
                connect: {
                    id: createdCustomer.id
                }
            },
            screenings: {
                connect: {
                    id: createdScreening.id
                }
            }
        }
    })
    console.log('ticket created', createTicket);
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
