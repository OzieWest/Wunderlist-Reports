export interface Config {
    wunderSecret: string;
    wunderId: string;
    blackList: Array<string> | string;
    templateDir: string;
    reportDir: string;
    concurrency: number;
    startDate: any;
    endDate: any;
}

export interface WunderList {
    id: number;
    title: string;
    owner_type: string;
    owner_id: number;
    list_type: string;
    public: boolean;
    revision: number;
    created_at: Date;
    type: string;
}

export interface WunderItem {
    id: number;
    created_at: Date;
    created_by_id: number;
    created_by_request_id: string;
    recurrence_type: string;
    recurrence_count: number;
    due_date: string;
    completed: boolean;
    completed_at: Date;
    completed_by_id: number;
    starred: boolean;
    list_id: number;
    revision: number;
    title: string;
    type: string;
    hours: number;
    list: string;
}