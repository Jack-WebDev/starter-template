import "@testing-library/jest-dom";
import { server } from "./mockServer";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
