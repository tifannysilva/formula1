import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "Bob Esponja Burger Racers", world: "Fenda do Biquíni" },
  { id: 2, name: "Patrick Star Drift Team", world: "Pedra do Patrick" },
  { id: 3, name: "Lula Molusco Jazz Racers", world: "Rua das Conchas" },
  { id: 4, name: "Sandy Turbo Squirrels", world: "Cúpula da Sandy" },
  { id: 5, name: "Plankton Chaos Drivers", world: "Balde de Lixo" },
];

const drivers = [
  { id: 1, name: "Bob Esponja", team: "Bob Esponja Burger Racers" },
  { id: 2, name: "Patrick Estrela", team: "Patrick Star Drift Team" },
  { id: 3, name: "Lula Molusco", team: "Lula Molusco Jazz Racers" },
  { id: 4, name: "Sandy Bochechas", team: "Sandy Turbo Squirrels" },
  { id: 5, name: "Plankton", team: "Plankton Chaos Drivers" },
];

server.get("/", async () => {
  return { message: "Bikini Bottom Kart API running!" };
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
      return { message: "Personagem não encontrado" };
    }

    response.type("application/json").code(200);
    return { driver };
  }
);

server.listen({ port: 3333 }, () => {
  console.log("BIKINI BOTTOM SERVER INIT");
});
});
