/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "*": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        /** * */
        options: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: never;
        };
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** /health */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) on aarch64-unknown-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit */
                            database?: string;
                            /** @example CONNECTED */
                            redisCacheConnection?: string;
                            redisQueueHealth?: {
                                /** @example PONG */
                                connection?: string;
                                /** @example 0 */
                                activeCount?: number;
                                /** @example 0 */
                                waitingCount?: number;
                                /** @example 2 */
                                completedCount?: number;
                                /** @example 0 */
                                failedCount?: number;
                            };
                        };
                    };
                };
                304: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/technology": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** /technology */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            displayName: string;
                            description: string;
                        }[];
                    };
                };
                304: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        /** /technology */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: components["requestBodies"]["Body"];
            responses: {
                /** @description Accepted */
                202: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example 12 */
                            id?: number;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/technology/{technologyId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** /technology/{technologyId} */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    technologyId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "*/*": {
                            id: number;
                            displayName: string;
                            description: string;
                        };
                    };
                };
                304: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        /** /technology/{technologyId} */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    technologyId: string;
                };
                cookie?: never;
            };
            requestBody: components["requestBodies"]["Body"];
            responses: {
                /** @description Accepted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "*/*": {
                            /** @example 12 */
                            id?: number;
                        };
                    };
                };
            };
        };
        post?: never;
        /** /technology/{technologyId} */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    technologyId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Accepted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "*/*": {
                            /** @example 12 */
                            id?: number;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/queue": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** /queue */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @example It can be anything */
                        data?: string;
                    };
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example 6 */
                            jobId?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: {
        Body: {
            content: {
                "application/json": {
                    /** @example BullMQ */
                    displayName?: string;
                    /** @example A javascript library that leverages Redis to set up queues */
                    description?: string;
                };
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;