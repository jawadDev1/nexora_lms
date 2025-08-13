import { NEXT_PUBLIC_PUSHER_APP_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } from "@/constants";
import Pusher from "pusher-js";

const pusherClient = new Pusher(NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
});

export default pusherClient;
