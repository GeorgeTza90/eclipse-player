import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useFetchManager, useDeleteManager } from "@/hooks/useCallManager";
import { EQ_BANDS } from "@/utils/defaultEQ";
import { logger } from "@/utils/logger";
import AddPresetModal from "@/components/ui/modals/AddPresetModal";
import UpdatePresetModal from "@/components/ui/modals/UpdatePresetModal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { EQGains, EqualizerProps, Presets } from "@/types/player.types";
import styles from "./equalizer.module.css";

const Equalizer = ({ color }: EqualizerProps) => {    
    const navigate = useNavigate();
    const { setEQGain, resetEQ, EQGain } = useAudio();
    const { goRGB } = useMiniPlayer();
    const { user } = useAuth();
    
    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { loading: deleteLoading, call: deleteCall } = useDeleteManager();

    const [presets, setPresets] = useState<Presets[] | []>([]);
    const [presetToUpdate, setPresetToUpdate] = useState<Presets>();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [showPresetList, setShowPresetList] = useState(false);
    
    /* --- SET FREQ --- */
    const frequencies = useMemo(() => EQ_BANDS, []);

    /* --- LOAD USER PRESETS --- */
    const loadPresets = async () => {user && await fetchCall("userPresets");}

    useEffect(() => {
        const fetchPresets = async () => await loadPresets();
        fetchPresets();
    }, [user]);
    
    useEffect(() => {
        if (fetchState.userPresets) {
            const parsed = fetchState.userPresets.map((p: Presets) => ({ ...p, preset: typeof p.preset === "string" ? JSON.parse(p.preset) : p.preset }));
            setPresets(parsed);        }
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
        }
    };

    return (
        <div className={styles.divContainer}>
    {/* Equalizer */}
            <h3 className={styles.heading}>Graphic EQ</h3>
            <div className={styles.EQcontainer}>
                <div className={styles.linesDiv}>
                    {Array(16).fill(0).map((_, i) => (
                        <hr key={i} className={styles.line} />
                    ))}
                </div>

                {frequencies.map(band => (
                    <div key={band.label} className={styles.sliderWrapper}>
                        <input
                            type="range"
                            min={-7}
                            max={7}
                            step={1}
                            value={EQGain[band.label] ?? 0}
                            className={styles.verticalSlider}
                            style={{ accentColor: goRGB ? "#acacac" : color }}
                            onChange={e => setEQGain(band.label, Number(e.target.value))}
                        />
                        <span className={styles.label}>{band.label}</span>
                    </div>
                ))}
            </div>

    {/* Presets */}
            {user ? (
                <>
                    <div className={styles.buttons}>
                        <button className={styles.presetButton} onClick={resetEQ}>Reset</button>
                        <button className={styles.presetButton} onClick={() => setModalVisible(true)}>Save</button>
                        <button className={showPresetList ? styles.presetButtonActive : styles.presetButton} onClick={() => setShowPresetList(prev => !prev)}>Load</button>
                    </div>

                    {showPresetList && (
                        <div className={styles.presetsContainer}>
                            {fetchLoading["userPresets"] ? (
                                <div className={styles.preset}>Loading presets...</div>
                            ) : (
                                presets.map(item => (
                                    <div key={item.id} className={styles.presetsDiv}>
                                        <div className={styles.preset} onClick={() => item.preset && handleUpdateEQ(item.preset)}>
                                            {item.title}
                                        </div>
                                        <div>
                                            <button className={styles.presetUpdate} onClick={() => { setPresetToUpdate(item); setModalUpdateVisible(true); }}>↺</button>
                                            <button className={styles.presetDelete} onClick={() => handleDeletePreset(item.id)} disabled={deleteLoading["deleteUserPreset"]}>X</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}<br/><br/><br/><br/>
                </>
            ) : (
                <div className={styles.notLoggedIn}>
                    <button className={styles.SignInButton} onClick={() => navigate("/")}>Sign In</button><br/>
                    to access EQ presets
                </div>
            )}

    {/* Modales */}
            <AddPresetModal visible={modalVisible} onClose={() => setModalVisible(false)} onCreated={loadPresets} eqGains={EQGain} />
            {presetToUpdate && <UpdatePresetModal visible={modalUpdateVisible} onClose={() => setModalUpdateVisible(false)} onCreated={loadPresets} presetNew={presetToUpdate} newEQ={EQGain} />}
        </div>
    );
}

export default Equalizer;