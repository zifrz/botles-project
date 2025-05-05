"use client";

import { BACKEND_URL } from "@/app/config";
import { Input } from "@/components/Input";
import { ZapCell } from "@/components/ZapCell";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAvailableActionsAndTriggers() {
    const [loading, setLoading] = useState({ actions: true, triggers: true });
    const [availableActions, setAvailableActions] = useState<{id: string, name: string, image: string}[]>([]);
    const [availableTriggers, setAvailableTriggers] = useState<{id: string, name: string, image: string}[]>([]);

    useEffect(() => {
        Promise.all([
            axios.get(`${BACKEND_URL}/api/v1/trigger/available`),
            axios.get(`${BACKEND_URL}/api/v1/action/available`)
        ])
        .then(([triggersRes, actionsRes]) => {
            setAvailableTriggers(triggersRes.data.availableTriggers);
            setAvailableActions(actionsRes.data.availableActions);
        })
        .catch(error => {
            console.error("Error fetching actions/triggers:", error);
        })
        .finally(() => {
            setLoading({ actions: false, triggers: false });
        });
    }, []);

    return { availableActions, availableTriggers, loading };
}

export default function CreateZapPage() {
    const router = useRouter();
    const { availableActions, availableTriggers, loading } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    const handlePublish = async () => {
        if (!selectedTrigger?.id) {
            alert("Please select a trigger first");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                "availableTriggerId": selectedTrigger.id,
                "triggerMetadata": {},
                "actions": selectedActions.map(a => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: a.metadata
                }))
            }, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error creating zap:", error);
            alert("Failed to create zap. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="p-4 flex justify-end">
                <PrimaryButton 
                    onClick={handlePublish}
                    disable={!selectedTrigger?.id}
                >
                    Publish Zap
                </PrimaryButton>
            </div>

            {/* Zap Builder */}
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Your Zap</h1>
                    
                    {/* Trigger Cell */}
                    <ZapCell 
                        onClick={() => setSelectedModalIndex(1)}
                        name={selectedTrigger?.name || "Select Trigger"}
                        index={1}
                        isActive={!!selectedTrigger}
                        className="w-full max-w-md"
                    />

                    {/* Connection Line */}
                    {selectedActions.length > 0 && (
                        <div className="h-8 w-0.5 bg-amber-400"></div>
                    )}

                    {/* Action Cells */}
                    {selectedActions.map((action, index) => (
                        <div key={index} className="flex flex-col items-center w-full">
                            <ZapCell 
                                onClick={() => setSelectedModalIndex(action.index)}
                                name={action.availableActionName || "Select Action"}
                                index={action.index}
                                isActive={!!action.availableActionId}
                                className="w-full max-w-md"
                            />
                            {index < selectedActions.length - 1 && (
                                <div className="mt-4 h-8 w-0.5 bg-amber-400"></div>
                            )}
                        </div>
                    ))}

                    {/* Add Action Button */}
                    <div className="pt-4">
                        <PrimaryButton 
                            onClick={() => {
                                if (!selectedTrigger) {
                                    alert("Please select a trigger first");
                                    return;
                                }
                                setSelectedActions(a => [...a, {
                                    index: a.length + 2,
                                    availableActionId: "",
                                    availableActionName: "",
                                    metadata: {}
                                }]);
                            }}
                        >
                            <span className="text-2xl">+</span>
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedModalIndex && (
                <Modal 
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
                    onSelect={(props) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name
                            });
                        } else {
                            setSelectedActions(a => {
                                const newActions = [...a];
                                newActions[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata
                                };
                                return newActions;
                            });
                        }
                        setSelectedModalIndex(null);
                    }}
                    index={selectedModalIndex}
                    loading={selectedModalIndex === 1 ? loading.triggers : loading.actions}
                />
            )}
        </div>
    );
}

function Modal({ 
    index, 
    onSelect, 
    availableItems, 
    loading 
}: { 
    index: number, 
    onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, 
    availableItems: {id: string, name: string, image: string}[],
    loading: boolean
}) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop with blur effect - now parent of modal content */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300">
                {/* Modal container */}
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Select {isTrigger ? "Trigger" : "Action"}
                        </h3>
                        <button 
                            onClick={() => onSelect(null)}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600"></div>
                            </div>
                        ) : step === 0 ? (
                            <div className="space-y-2">
                                {availableItems.map(({id, name, image}) => (
                                    <div 
                                        key={id}
                                        onClick={() => {
                                            if (isTrigger) {
                                                onSelect({
                                                    id,
                                                    name,
                                                    metadata: {}
                                                });
                                            } else {
                                                setStep(1);
                                                setSelectedAction({
                                                    id,
                                                    name
                                                });
                                            }
                                        }}
                                        className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors"
                                    >
                                        <img 
                                            src={image} 
                                            alt={name}
                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                        />
                                        <span className="font-medium text-gray-800">{name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">{selectedAction?.name} Configuration</h4>
                                {selectedAction?.id === "email" && (
                                    <EmailSelector setMetadata={(metadata) => {
                                        onSelect({
                                            ...selectedAction,
                                            metadata
                                        });
                                    }} />
                                )}
                                {selectedAction?.id === "send-sol" && (
                                    <SolanaSelector setMetadata={(metadata) => {
                                        onSelect({
                                            ...selectedAction,
                                            metadata
                                        });
                                    }} />
                                )}
                                <button
                                    onClick={() => setStep(0)}
                                    className="text-sm text-amber-600 hover:text-amber-700"
                                >
                                    ← Back to selection
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


function EmailSelector({ setMetadata }: { setMetadata: (params: any) => void }) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-4">
            <Input 
                label="Recipient Email"
                type="email"
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                label="Email Body"
                type="text"
                placeholder="Enter your message"
                onChange={(e) => setBody(e.target.value)}
                // textarea
            />
            <PrimaryButton 
                onClick={() => setMetadata({ email, body })}
                disable={!email || !body}
            >
                Save Configuration
            </PrimaryButton>
        </div>
    );
}

function SolanaSelector({ setMetadata }: { setMetadata: (params: any) => void }) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div className="space-y-4">
            <Input 
                label="Recipient Address"
                type="text"
                placeholder="Enter SOL address"
                onChange={(e) => setAddress(e.target.value)}
            />
            <Input 
                label="Amount (SOL)"
                type="text"
                placeholder="0.00"
                onChange={(e) => setAmount(e.target.value)}
            />
            <PrimaryButton 
                onClick={() => setMetadata({ amount, address })}
                disable={!amount || !address}
            >
                Save Configuration
            </PrimaryButton>
        </div>
    );
}