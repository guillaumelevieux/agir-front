export enum GroupeEvent {
  GROUPE_SUPPRIME,
  GROUPE_INSTALLE,
}

export interface GroupeEventBus {
  publish(eventName: GroupeEvent): void;
  subscribe(eventName: GroupeEvent, callback: () => void): void;
}

export class GroupeEventBusImpl implements GroupeEventBus {
  private static instance: GroupeEventBusImpl | null = null;
  private eventSubscribers: Record<GroupeEvent, (() => void)[]> = {
    [GroupeEvent.GROUPE_SUPPRIME]: [],
    [GroupeEvent.GROUPE_INSTALLE]: [],
  };
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new GroupeEventBusImpl();
    }
    return this.instance;
  }

  publish(eventName: GroupeEvent) {
    const subscribers = this.eventSubscribers[eventName] || [];
    subscribers.forEach(callback => callback());
  }

  subscribe(eventName: GroupeEvent, callback: () => void) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = [];
    }
    this.eventSubscribers[eventName].push(callback);
  }
}
