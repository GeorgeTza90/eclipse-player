import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useDeleteManager, useFetchManager } from "@/hooks/useCallManager";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { logger } from "@/utils/logger";
import type { EQGains, Presets } from "@/types/player.types";
import AddPresetModal from "@/components/ui/modals/AddPresetModal";
import UpdatePresetModal from "@/components/ui/modals/UpdatePresetModal";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import DeleteButton from "@/components/ui/buttons/DeleteButton";
import UpdateButton from "@/components/ui/buttons/UpdateButton";
import PresetsButtons from "./PresetsButtons";
import Loader from "@/components/ui/loaders/Loader";
import styles from "./eqPresets.module.css";
import NotLoggedIn from "@/components/ui/other/NotLoggedIn";

const EqPresets = () => {    
    const { user } = useAuth();
    const { setEQGain, resetEQ, EQGain } = useAudio();

    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { loading: deleteLoading, call: deleteCall } = useDeleteManager();

    const [presets, setPresets] = useState<Presets[] | []>([]);
    const [presetToUpdate, setPresetToUpdate] = useState<Presets>();
    const [presetToDelete, setPresetToDelete] = useState<Presets>();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [showPresetList, setShowPresetList] = useState(false);

    /* --- LOAD USER PRESETS --- */
    const loadPresets = async () => { user && await fetchCall("userPresets"); };

    useEffect(() => {
        const fetchPresets = async () => await loadPresets();
        fetchPresets();
    }, [user]);

    useEffect(() => {
        if (fetchState.userPresets) {
            const parsed = fetchState.userPresets.map((p: Presets) => ({ ...p, preset: typeof p.preset === "string" ? JSON.parse(p.preset) : p.preset }));
            setPresets(parsed);
        }
    }, [fetchState.userPresets]);

    /* --- UPDATE/DELETE PRESETS  --- */
    const handleUpdateEQ = (preset: EQGains) => {
        Object.entries(preset).forEach(([label, value]) => {
            if (EQGain.hasOwnProperty(label)) setEQGain(label, value);
        });
    };

    const handleDeletePreset = async (id: number) => {
        try {
            await deleteCall("deleteUserPreset", id);
            setPresets(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            logger.error(getErrorMessage(err, "Failed to delete preset"));
        } finally {
            setPresetToDelete(undefined);
        }
    };

    return (<>
        {user ? (
            <>  
                <PresetsButtons showPresetList={showPresetList} onReset={resetEQ} onSave={() => setModalVisible(true)} onLoad={() => setShowPresetList(prev => !prev)} />

                {showPresetList && (
                    <div className={styles.presetsContainer}>
                        {fetchLoading["userPresets"] ? (
                            <Loader text={"Loading presets..."} size={"small"} />                            
                        ) : (
                            presets.map(item => (
                                <div key={item.id} className={styles.presetsDiv} onClick={() => item.preset && handleUpdateEQ(item.preset)}>
                                    <div className={styles.preset}>
                                        {item.title}
                                    </div>
                                    <div>
                                        <UpdateButton onClick={(e) => { e.stopPropagation(); setPresetToUpdate(item); setModalUpdateVisible(true); }} />
                                        <DeleteButton onClick={(e) => { e.stopPropagation(); setPresetToDelete(item); }} disabled={deleteLoading["deleteUserPreset"]} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}<br/><br/><br/><br/>
            </>
        ) : (
            <div style={{ marginTop: "-10rem"}}>
                <NotLoggedIn text={"to access EQ presets"}/>
            </div>
        )}

{/* Modales */}
        <AddPresetModal visible={modalVisible} onClose={() => setModalVisible(false)} onCreated={loadPresets} eqGains={EQGain} />
        {presetToUpdate && <UpdatePresetModal visible={modalUpdateVisible} onClose={() => setModalUpdateVisible(false)} onCreated={loadPresets} presetNew={presetToUpdate} newEQ={EQGain} />}
        {presetToDelete && (<ConfirmModal message={`Delete preset "${presetToDelete.title}"?`} onConfirm={() => handleDeletePreset(presetToDelete.id)} onCancel={() => setPresetToDelete(undefined)} />)}
    </>);
}

export default EqPresets;