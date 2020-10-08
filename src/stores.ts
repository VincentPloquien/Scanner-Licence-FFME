import { writable, get } from "svelte/store";
import type Climber from "./climber";

function createClimbers() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        addClimber: (climber: Climber) => {
            update((list) => {
                if (!list.some(element => element.id === climber.id)) {
                    list = [climber, ...list];
                }
                return list;
            });
        },
        delClimber: (climber: Climber) => {
            update((list) => {
                list = list.filter(element => element.id !== climber.id);
                return list;
            });
        },
        clear: () => {
            set([]);
        }
    };
}
export const climbers = createClimbers();