"use client"
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    createdAt?: string; // Adding optional createdAt field
    actions: {
        id: string;
        zapId: string;
        actionId: string;
        sortingOrder: number;
        type: {
            id: string;
            name: string;
            image: string;
        };
    }[];
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
            image: string;
        };
    };
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        })
            .then(res => {
                const zapsWithDates = res.data.zaps.map((zap: Zap) => ({
                    ...zap,
                    createdAt: new Date().toLocaleDateString() // Temporary date
                }));
                setZaps(zapsWithDates);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching zaps:", error);
                setLoading(false);
            });
    }, []);

    return { loading, zaps };
}

export default function Dashboard() {
    const { loading, zaps } = useZaps();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Zaps</h1>
                    <DarkButton onClick={() => router.push("/zap/create")} >
                        Create New Zap
                    </DarkButton>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                ) : (
                    <ZapTable zaps={zaps} />
                )}
            </div>
        </div>
    );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-300 font-medium text-gray-700">
                <div className="col-span-3">Name</div>
                <div className="col-span-2">ID</div>
                <div className="col-span-2">Created at</div>
                <div className="col-span-3">Webhook URL</div>
                <div className="col-span-2">Actions</div>
            </div>

            {zaps.map(zap => (
                <div key={zap.id} className="grid grid-cols-12 gap-4 p-6 items-center border-b border-gray-300 hover:bg-gray-50 transition-colors">
                    <div className="col-span-3 flex items-center space-x-2 overflow-x-auto">
                        <img
                            src={zap.trigger.type.image}
                            alt={zap.trigger.type.name}
                            className="w-8 h-8 rounded-md object-contain flex-shrink-0"
                        />
                        {zap.actions.map(action => (
                            <img
                                key={action.id}
                                src={action.type.image}
                                alt={action.type.name}
                                className="w-8 h-8 rounded-md object-contain flex-shrink-0"
                            />
                        ))}
                    </div>

                    <div className="col-span-2 text-sm text-gray-600 break-all">
                        {zap.id}
                    </div>

                    <div className="col-span-2 text-sm text-gray-600">
                        {zap.createdAt || "Nov 13, 2023"}
                    </div>

                    <div className="col-span-3 text-sm text-gray-600 break-all font-mono">
                        {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}
                    </div>

                    <div className="col-span-2">
                        <LinkButton onClick={() => { }}> Go </LinkButton>
                    </div>
                </div>
            ))}
        </div>
    );
}