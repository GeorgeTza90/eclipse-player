import { useEffect, useMemo, useState } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import { EQ_BANDS } from "../../utils/defaultEQ";
import { fetchUserPresets } from "../../services/GetService";
import { deleteUserPreset } from "../../services/DeleteService";
import AddPresetModal from "./AddPresetModal";
import UpdatePresetModal from "./UpdatePresetModal";
import styles from "./equalizer.module.css";
import { useAuth } from "../../contexts/AuthContextWeb";

export default function Equalizer({ color }) {
    const isMobile = useIsMobile();
    const { setEQGain, resetEQ, EQGain } = useAudio();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [presets, setPresets] = useState([]);
    const [presetToUpdate, setPresetToUpdate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [showPresetList, setShowPresetList] = useState(false);

    const frequencies = useMemo(() => (
        isMobile
            ? EQ_BANDS.filter(b => [100, 250, 630, 1600, 4000, 10000, 16000, 20000].includes(b.value))
            : EQ_BANDS
    ), [isMobile]);

    useEffect(() => {
        loadPresets();
    }, []);

    const loadPresets = async () => {
        setLoading(true);
        try {
            const data = await fetchUserPresets();
            const parsed = data.map(p => ({ ...p, preset: typeof p.preset === "string" ? JSON.parse(p.preset) : p.preset }));
            setPresets(parsed);
        } catch (err) {
            console.error("Failed to load presets:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEQ = (preset) => {
        Object.entries(preset).forEach(([label, value]) => {
            setEQGain(label, value);
        });
    };

    const handleDeletePreset = async (id) => {
        setLoading(true);
        try {
            await deleteUserPreset(id);
            setPresets(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete preset:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.divContainer}>
            <h3 className={styles.heading}>Graphic EQ</h3>

            <div className={styles.EQcontainer}>
                <div className={styles.linesDiv}>
                    {Array(isMobile ? 12 : 16).fill(0).map((_, i) => (
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
                            style={{ accentColor: color }}
                            onChange={e => setEQGain(band.label, Number(e.target.value))}
                        />
                        <span className={styles.label}>{band.label}</span>
                    </div>
                ))}
            </div>

            {user ? (
                <>
                    <div className={styles.buttons}>
                        <button className={styles.presetButton} onClick={resetEQ}>Reset</button>
                        <button className={styles.presetButton} onClick={() => setModalVisible(true)}>Save</button>
                        <button className={showPresetList ? styles.presetButtonActive : styles.presetButton} onClick={() => setShowPresetList(prev => !prev)}>Load</button>
                    </div>

                    {showPresetList && (
                        <div className={styles.presetsContainer}>
                            {loading ? (
                                <div className={styles.preset}>Loading presets...</div>
                            ) : (
                                presets.map(item => (
                                    <div key={item.id} className={styles.presetsDiv}>
                                        <div className={styles.preset} onClick={() => { handleUpdateEQ(item.preset)}}>
                                            {item.title}
                                        </div>
                                        <div>
                                            <button className={styles.presetUpdate} onClick={() => { setPresetToUpdate(item); setModalUpdateVisible(true); }}>↺</button>
                                            <button className={styles.presetDelete} onClick={() => handleDeletePreset(item.id)}>X</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </>                
            ) : (
                <div className={styles.notLoggedIn}>Sign In to have access to EQ presets</div>
            )}
            

            <AddPresetModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreated={loadPresets}
                eqGains={EQGain}
            />

            <UpdatePresetModal
                visible={modalUpdateVisible}
                onClose={() => setModalUpdateVisible(false)}
                onCreated={loadPresets}
                presetNew={presetToUpdate}
                newEQ={EQGain}
            />
        </div>
    );
}