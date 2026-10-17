/* global Deno */
import { createModerationHandler } from "./handler.mjs";

Deno.serve(createModerationHandler(Deno.env.toObject()));
