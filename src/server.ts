import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "Hello Kitty Speed Club", world: "Rainbow Cherry Town" },
  { id: 2, name: "Kuromi Chaos Racers", world: "Midnight Mischief City" },
  { id: 3, name: "My Melody Dream Team", world: "Sweet Heart Meadow" },
  { id: 4, name: "Badtz-Maru Drift Crew", world: "Neon Harbor District" },
  { id: 5, name: "Cinnamoroll Sky Riders", world: "Cloudberry Kingdom" },
];

const drivers = [
  { id: 1, name: "Hello Kitty", team: "Hello Kitty Speed Club" },
  { id: 2, name: "Kuromi", team: "Kuromi Chaos Racers" },
  { id: 3, name: "My Melody", team: "My Melody Dream Team" },
  { id: 4, name: "Badtz-Maru", team: "Badtz-Maru Drift Crew" },
  { id: 5, name: "Cinnamoroll", team: "Cinnamoroll Sky Riders" },
];

server.get("/", async () => {
  return { message: "Sanrio Kart API running!" };
});

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Character Not Found" };
    }

    response.type("application/json").code(200);
    return { driver };
  }
);

server.listen({ port: 3333 }, () => {
  console.log("SANRIO SERVER INIT");
});
