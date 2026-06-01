    // ==UserScript==
    // @author       Quasar
    // @name         KatipOnline Event Interceptor
    // @match        *://test.katiponline.com/*
    // @run-at       document-end
    // @grant        none
    // ==/UserScript==
    (function() {
        'use strict';
        window.isQuasarBotRunning = false;
        window.quasarBotWPM = 100;
        window.quasarHumanMode = false;
        window.quasarAutoMode = false;
        window.quasarShieldMode = true;
        window.quasarLang = "TR";
        const quasarLanguages = {
            TR: { label: "TR 🇹🇷", chars: "abcçdefgğhıijklmnoöprsştuüvyz", start: "ENGINE_STARTED", modal_err: "MODAL_NOT_FOUND", textarea_err: "TEXTAREA_NOT_FOUND", empty_err: "TEXT_IS_EMPTY", ready: "READY", inject: "INJECT", typo: "TYPO & FIXING", pause: "PAUSE_THINKING...", success: "EXECUTION_SUCCESSFUL", term: "TERMINATED_BY_USER", standby: "STATUS: STANDBY", injecting: "STATUS: INJECTING...", init_btn: "INITIALIZE ENGINE", term_btn: "TERMINATE EXECUTION", title: "QUASAR_INTERFACE", freq: "INJECTION FREQUENCY" },
            EN: { label: "EN 🇺🇸", chars: "abcdefghijklmnopqrstuvwxyz", start: "ENGINE_STARTED", modal_err: "MODAL_NOT_FOUND", textarea_err: "TEXTAREA_NOT_FOUND", empty_err: "TEXT_IS_EMPTY", ready: "READY", inject: "INJECT", typo: "TYPO & FIXING", pause: "PAUSE_THINKING...", success: "EXECUTION_SUCCESSFUL", term: "TERMINATED_BY_USER", standby: "STATUS: STANDBY", injecting: "STATUS: INJECTING...", init_btn: "INITIALIZE ENGINE", term_btn: "TERMINATE EXECUTION", title: "QUASAR_INTERFACE", freq: "INJECTION FREQUENCY" },
            DE: { label: "DE 🇩🇪", chars: "abcdefghijklmnopqrstuvwxyzäöüß", start: "MOTOR_GESTARTET", modal_err: "MODAL_NICHT_GEFUNDEN", textarea_err: "TEXTFELD_NICHT_GEFUNDEN", empty_err: "TEXT_IST_LEER", ready: "BEREIT", inject: "INJEKTION", typo: "TYPO & KORREKTUR", pause: "PAUSE_DENKEN...", success: "AUSFÜHRUNG_ERFOLGREICH", term: "VON_BENUTZER_BEENDET", standby: "STATUS: BEREITSCHAFT", injecting: "STATUS: INJEKTION...", init_btn: "MOTOR_INITIALISIEREN", term_btn: "AUSFÜHRUNG_BEENDEN", title: "QUASAR_SCHNITTSTELLE", freq: "INJEKTIONSFREQUENZ" },
            FR: { label: "FR 🇫🇷", chars: "abcdefghijklmnopqrstuvwxyzàâçéèêëîïôûù", start: "MOTEUR_DÉMARRÉ", modal_err: "MODALE_NON_TROUVÉE", textarea_err: "ZONE_TEXTE_NON_TROUVÉE", empty_err: "TEXTE_VIDE", ready: "PRÊT", inject: "INJECTER", typo: "TYPO & CORRECTION", pause: "PAUSE_RÉFLEXION...", success: "EXÉCUTION_RÉUSSIE", term: "TERMINÉ_PAR_UTILISATEUR", standby: "STATUT: ATTENTE", injecting: "STATUT: INJECTION...", init_btn: "INITIALISER_MOTEUR", term_btn: "TERMINER_EXÉCUTION", title: "INTERFACE_QUASAR", freq: "FRÉQUENCE_INJECTION" },
            ES: { label: "ES 🇪🇸", chars: "abcdefghijklmnñopqrstuvwxyzáéíóúü", start: "MOTOR_INICIADO", modal_err: "MODAL_NO_ENCONTRADO", textarea_err: "TEXTAREA_NO_ENCONTRADO", empty_err: "TEXTO_VACÍO", ready: "LISTO", inject: "INYECTAR", typo: "TYPO & CORRECCIÓN", pause: "PAUSA_PENSANDO...", success: "EJECUCIÓN_EXITOSA", term: "TERMINADO_POR_USUARIO", standby: "ESTADO: ESPERA", injecting: "ESTADO: INYECTANDO...", init_btn: "INICIALIZAR_MOTOR", term_btn: "TERMINAR_EJECUCIÓN", title: "INTERFAZ_QUASAR", freq: "FRECUENCIA_INYECCIÓN" },
            IT: { label: "IT 🇮🇹", chars: "abcdefghijklmnopqrstuvwxyzàèéìòù", start: "MOTORE_AVVIATO", modal_err: "MODALE_NON_TROVATO", textarea_err: "TEXTAREA_NON_TROVATA", empty_err: "TESTO_VUOTO", ready: "PRONTO", inject: "INNIETTARE", typo: "TYPO & CORREZIONE", pause: "PAUSA_PENSIERO...", success: "ESECUZIONE_RIUSCITA", term: "TERMINATO_DALL_UTENTE", standby: "STATO: ATTESA", injecting: "STATO: INIEZIONE...", init_btn: "INIZIALIZZA_MOTORE", term_btn: "TERMINA_ESECUZIONE", title: "INTERFACCIA_QUASAR", freq: "FREQUENZA_INIEZIONE" },
            PT: { label: "PT 🇵🇹", chars: "abcdefghijklmnopqrstuvwxyzáàãâéêíóõôúç", start: "MOTOR_INICIADO", modal_err: "MODAL_NÃO_ENCONTRADO", textarea_err: "TEXTAREA_NÃO_ENCONTRADO", empty_err: "TEXTO_VAZIO", ready: "PRONTO", inject: "INJETAR", typo: "TYPO & CORREÇÃO", pause: "PAUSA_PENSANDO...", success: "EXECUÇÃO_BEM_SUCEDIDA", term: "TERMINADO_PELO_USUÁRIO", standby: "STATUS: ESPERA", injecting: "STATUS: INJETANDO...", init_btn: "INICIALIZAR_MOTOR", term_btn: "TERMINAR_EXECUÇÃO", title: "INTERFACE_QUASAR", freq: "FREQUÊNCIA_INJEÇÃO" },
            RU: { label: "RU 🇷🇺", chars: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", start: "ДВИГАТЕЛЬ_ЗАПУЩЕН", modal_err: "МОДАЛЬНОЕ_ОКНО_НЕ_НАЙДЕНО", textarea_err: "ТЕКСТОВОЕ_ПОЛЕ_НЕ_НАЙДЕНО", empty_err: "ТЕКСТ_ПУСТ", ready: "ГОТОВО", inject: "ВПРЫСК", typo: "ОПЕЧАТКА & ИСПРАВЛЕНИЕ", pause: "ПАУЗА_РАЗМЫШЛЕНИЯ...", success: "ВЫПОЛНЕНИЕ_УСПЕШНО", term: "ЗАВЕРШЕНО_ПОЛЬЗОВАТЕЛЕМ", standby: "СТАТУС: ОЖИДАНИЕ", injecting: "СТАТУС: ВПРЫСК...", init_btn: "ЗАПУСК_ДВИГАТЕЛЯ", term_btn: "ЗАВЕРШИТЬ_ВЫПОЛНЕНИЕ", title: "ИНТЕРФЕЙС_QUASAR", freq: "ЧАСТОТА_ВПРЫСКА" },
            NL: { label: "NL 🇳🇱", chars: "abcdefghijklmnopqrstuvwxyzëij", start: "MOTOR_GESTART", modal_err: "MODAL_NIET_GEVONDEN", textarea_err: "TEXTAREA_NIET_GEVONDEN", empty_err: "TEKST_IS_LEEG", ready: "KLAAR", inject: "INJECTEREN", typo: "TYPO & CORRECTIE", pause: "PAUZE_DENKEN...", success: "UITVOERING_SUCCESVOL", term: "BEËINDIGD_DOOR_GEBRUIKER", standby: "STATUS: STAND-BY", injecting: "STATUS: INJECTEREN...", init_btn: "MOTOR_INITIALISEREN", term_btn: "UITVOERING_BEËINDIGEN", title: "QUASAR_INTERFACE", freq: "INJECTIEFREQUENTIE" },
            PL: { label: "PL 🇵🇱", chars: "aąbcćdeęfghijklłmnńoóprsśtuwyzźż", start: "SILNIK_URUCHOMIONY", modal_err: "MODAL_NIE_ZNALEZIONO", textarea_err: "TEXTAREA_NIE_ZNALEZIONO", empty_err: "TEKST_PUSTY", ready: "GOTOWY", inject: "WSTRZYKNIĘCIE", typo: "TYPO & KOREKTA", pause: "PAUZA_MYŚLENIE...", success: "WYKONANIE_UDANE", term: "ZAKOŃCZONE_PRZEZ_UŻYTKOWNIKA", standby: "STATUS: OCZEKIWANIE", injecting: "STATUS: WSTRZYKIWANIE...", init_btn: "INICJALIZUJ_SILNIK", term_btn: "ZAKOŃCZ_WYKONANIE", title: "INTERFEJS_QUASAR", freq: "CZĘSTOTLIWOŚĆ_WSTRZYKIWANIA" },
            JA: { label: "JA 🇯🇵", chars: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん", start: "エンジン起動", modal_err: "モーダルが見つかりません", textarea_err: "テキストエリアが見つかりません", empty_err: "テキストが空です", ready: "準備完了", inject: "注入", typo: "誤字 & 修正", pause: "考え中...", success: "実行成功", term: "ユーザーによって終了", standby: "状態: 待機中", injecting: "状態: 注入中...", init_btn: "エンジン初期化", term_btn: "実行終了", title: "QUASAR_インターフェース", freq: "注入頻度" },
            ZH: { label: "ZH 🇨🇳", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", start: "引擎已启动", modal_err: "未找到模态框", textarea_err: "未找到文本区域", empty_err: "文本为空", ready: "准备就绪", inject: "注入", typo: "错别字 & 修正", pause: "思考中...", success: "执行成功", term: "被用户终止", standby: "状态: 待机", injecting: "状态: 注入中...", init_btn: "初始化引擎", term_btn: "终止执行", title: "QUASAR_界面", freq: "注入频率" },
            KO: { label: "KO 🇰🇷", chars: "가나다라마바사아자차카타파하", start: "엔진 시작됨", modal_err: "모달을 찾을 수 없음", textarea_err: "텍스트 영역을 찾을 수 없음", empty_err: "텍스트가 비어 있음", ready: "준비 완료", inject: "주입", typo: "오타 & 수정", pause: "생각 중...", success: "실행 성공", term: "사용자에 의해 종료됨", standby: "상태: 대기 중", injecting: "상태: 주입 중...", init_btn: "엔진 초기화", term_btn: "실행 종료", title: "QUASAR_인터페이스", freq: "주입 빈도" },
            AR: { label: "AR 🇸🇦", chars: "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي", start: "تم تشغيل المحرك", modal_err: "لم يتم العثور على النموذج", textarea_err: "لم يتم العثور على منطقة النص", empty_err: "النص فارغ", ready: "جاهز", inject: "حقن", typo: "خطأ مطبعي & تصحيح", pause: "جارٍ التفكير...", success: "تم التنفيذ بنجاح", term: "تم الإنهاء من قبل المستخدم", standby: "الحالة: في الانتظار", injecting: "الحالة: جارٍ الحقن...", init_btn: "تهيئة المحرك", term_btn: "إنهاء التنفيذ", title: "واجهة_QUASAR", freq: "تردد الحقن" },
            HI: { label: "HI 🇮🇳", chars: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशसह", start: "इंजन शुरू", modal_err: "मोडल नहीं मिला", textarea_err: "टेक्स्ट क्षेत्र नहीं मिला", empty_err: "टेक्स्ट खाली है", ready: "तैयार", inject: "इंजेक्ट करें", typo: "टाइपो & सुधार", pause: "सोच रहे हैं...", success: "निष्पादन सफल", term: "उपयोगकर्ता द्वारा समाप्त", standby: "स्थिति: स्टैंडबाय", injecting: "स्थिति: इंजेक्ट हो रहा है...", init_btn: "इंजन प्रारंभ करें", term_btn: "निष्पादन समाप्त करें", title: "QUASAR_इंटरफ़ेस", freq: "इंजेक्शन आवृत्ति" },
            EL: { label: "EL 🇬🇷", chars: "αβγδεζηθικλμνξοπρστυφχψω", start: "Ο κινητήρας ξεκίνησε", modal_err: "Το modal δεν βρέθηκε", textarea_err: "Το textarea δεν βρέθηκε", empty_err: "Το κείμενο είναι κενό", ready: "Έτοιμο", inject: "Εγχύση", typo: "Τυπογραφικό & Διόρθωση", pause: "Σκέψη...", success: "Επιτυχής εκτέλεση", term: "Τερματίστηκε από τον χρήστη", standby: "Κατάσταση: Αναμονή", injecting: "Κατάσταση: Έγχυση...", init_btn: "Αρχικοποίηση κινητήρα", term_btn: "Τερματισμός εκτέλεσης", title: "Διεπαφή_QUASAR", freq: "Συχνότητα έγχυσης" },
            SV: { label: "SV 🇸🇪", chars: "abcdefghijklmnopqrstuvwxyzåäö", start: "MOTOR_STARTAD", modal_err: "MODAL_HITTADES_EJ", textarea_err: "TEXTRUTA_HITTADES_EJ", empty_err: "TEXT_ÄR_TOM", ready: "REDO", inject: "INJICERA", typo: "TYPO & KORRIGERING", pause: "TÄNKER...", success: "UTFÖRANDE_LYCKAT", term: "AVBRUTEN_AV_ANVÄNDARE", standby: "STATUS: VÄNTAR", injecting: "STATUS: INJICERAR...", init_btn: "INITIALISERA_MOTOR", term_btn: "AVSLUTA_UTFÖRANDE", title: "QUASAR_GRÄNSSNITT", freq: "INJEKTIONSFREKVENS" },
            DA: { label: "DA 🇩🇰", chars: "abcdefghijklmnopqrstuvwxyzæøå", start: "MOTOR_STARTET", modal_err: "MODAL_IKKE_FUNDET", textarea_err: "TEKSTFELT_IKKE_FUNDET", empty_err: "TEKST_ER_TOM", ready: "KLAR", inject: "INJICER", typo: "TYPO & RETTELSE", pause: "TÆNKER...", success: "UDFØRELSE_SUCCESSFUL", term: "AFBRUDT_AF_BRUGER", standby: "STATUS: VENTER", injecting: "STATUS: INJICERER...", init_btn: "INITIALISER_MOTOR", term_btn: "AFSLUT_UDFØRELSE", title: "QUASAR_GRÆNSEFLADE", freq: "INJEKTIONSFREKVENS" },
            FI: { label: "FI 🇫🇮", chars: "abcdefghijklmnopqrstuvwxyzäö", start: "MOOTTORI_KÄYNNISTETTY", modal_err: "MODAALIA_EI_LÖYTYNYT", textarea_err: "TEKSTIKENTTÄÄ_EI_LÖYTYNYT", empty_err: "TEKSTI_ON_TYHJÄ", ready: "VALMIS", inject: "INJEKTOI", typo: "TYPO & KORJAUS", pause: "AJATTELEE...", success: "SUORITUS_ONNISTUI", term: "KÄYTTÄJÄN_LOPETTAMA", standby: "TILA: VALMIUSTILA", injecting: "TILA: INJEKTOIDAAN...", init_btn: "ALUSTA_MOOTTORI", term_btn: "LOPETA_SUORITUS", title: "QUASAR_KÄYTTÖLIITTYMÄ", freq: "INJEKTIOTAJUUS" },
            CS: { label: "CS 🇨🇿", chars: "aábcčdďeéěfghiíjklmnňoópqrřsštťuúůvyzž", start: "MOTOR_SPUŠTĚN", modal_err: "MODAL_NENALEZEN", textarea_err: "TEXTAREA_NENALEZENA", empty_err: "TEXT_JE_PRÁZDNÝ", ready: "PŘIPRAVENO", inject: "INJEKCE", typo: "TYPO & OPRAVA", pause: "PŘEMÝŠLÍM...", success: "SPUŠTĚNÍ_ÚSPĚŠNÉ", term: "UKONČENO_UŽIVATELEM", standby: "STAV: POHOTOVOST", injecting: "STAV: INJEKCE...", init_btn: "INICIALIZOVAT_MOTOR", term_btn: "UKONČIT_SPUŠTĚNÍ", title: "ROZHRANÍ_QUASAR", freq: "FREKVENCE_INJEKCE" },
            HU: { label: "HU 🇭🇺", chars: "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz", start: "MOTOR_ELINDÍTVA", modal_err: "MODAL_NEM_TALÁLHATÓ", textarea_err: "SZÖVEGMEZŐ_NEM_TALÁLHATÓ", empty_err: "A_SZÖVEG_ÜRES", ready: "KÉSZ", inject: "BEFECSKENDEZÉS", typo: "GÉPELÉSI_HIBA & JAVÍTÁS", pause: "GONDOLKODÁS...", success: "SIKERES_VÉGREHAJTÁS", term: "FELHASZNÁLÓ_ÁLTAL_LEÁLLÍTVA", standby: "ÁLLAPOT: KÉSZENLÉT", injecting: "ÁLLAPOT: BEFECSKENDEZÉS...", init_btn: "MOTOR_INITIALIZÁLÁSA", term_btn: "VÉGREHAJTÁS_LEÁLLÍTÁSA", title: "QUASAR_INTERFÉSZ", freq: "BEFECSKENDEZÉSI_GYAKORISÁG" },
            RO: { label: "RO 🇷🇴", chars: "abcdefghiîjklmnopqrstușțvwxyz", start: "MOTOR_PORNIT", modal_err: "MODAL_NEGĂSIT", textarea_err: "ZONĂ_TEXT_NEGĂSITĂ", empty_err: "TEXTUL_ESTE_GOL", ready: "GATA", inject: "INJECTARE", typo: "TYPO & CORECTARE", pause: "MĂ_GÂNDESC...", success: "EXECUȚIE_REUȘITĂ", term: "TERMINAT_DE_UTILIZATOR", standby: "STARE: AȘTEPTARE", injecting: "STARE: INJECTARE...", init_btn: "INIȚIALIZARE_MOTOR", term_btn: "TERMINARE_EXECUȚIE", title: "INTERFAȚĂ_QUASAR", freq: "FRECVENȚĂ_INJECTARE" },
            VI: { label: "VI 🇻🇳", chars: "abcdefghijklmnopqrstuvwxyzàáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ", start: "ĐỘNG_CƠ_ĐÃ_KHỞI_CHẠY", modal_err: "KHÔNG_TÌM_THẤY_MODAL", textarea_err: "KHÔNG_TÌM_THẤY_TEXTAREA", empty_err: "VĂN_BẢN_TRỐNG", ready: "SẴN_SÀNG", inject: "TIÊM", typo: "LỖI_CHÍNH_TẢ & SỬA_LỖI", pause: "ĐANG_SUY_NGHĨ...", success: "THỰC_HIỆN_THÀNH_CÔNG", term: "KẾT_THÚC_BỞI_NGƯỜI_DÙNG", standby: "TRẠNG_THÁI: CHỜ", injecting: "TRẠNG_THÁI: ĐANG_TIÊM...", init_btn: "KHỞI_TẠO_ĐỘNG_CƠ", term_btn: "KẾT_THÚC_THỰC_HIỆN", title: "GIAO_DIỆN_QUASAR", freq: "TẦN_SUẤT_TIÊM" },
            ID: { label: "ID 🇮🇩", chars: "abcdefghijklmnopqrstuvwxyz", start: "MESIN_DIMULAI", modal_err: "MODAL_TIDAK_DITEMUKAN", textarea_err: "TEXTAREA_TIDAK_DITEMUKAN", empty_err: "TEKS_KOSONG", ready: "SIAP", inject: "INJEKSI", typo: "TYPO & PERBAIKAN", pause: "BERPIKIR...", success: "EKSEKUSI_BERHASIL", term: "DIHENTIKAN_PENGGUNA", standby: "STATUS: SIAGA", injecting: "STATUS: MENGINJEKSI...", init_btn: "INISIALISASI_MESIN", term_btn: "HENTIKAN_EKSEKUSI", title: "ANTARMUKA_QUASAR", freq: "FREKUENSI_INJEKSI" },
            TH: { label: "TH 🇹🇭", chars: "กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ", start: "เริ่มเครื่องยนต์", modal_err: "ไม่พบโมดอล", textarea_err: "ไม่พบพื้นที่ข้อความ", empty_err: "ข้อความว่างเปล่า", ready: "พร้อม", inject: "ฉีด", typo: "คำผิด & แก้ไข", pause: "กำลังคิด...", success: "ดำเนินการสำเร็จ", term: "ผู้ใช้ยกเลิก", standby: "สถานะ: รอ", injecting: "สถานะ: กำลังฉีด...", init_btn: "เริ่มต้นเครื่องยนต์", term_btn: "สิ้นสุดการดำเนินการ", title: "QUASAR_อินเทอร์เฟซ", freq: "ความถี่ในการฉีด" },
            SR: { label: "SR 🇷🇸", chars: "абвгдђежзијклљмнњопрстћуфхцчџш", start: "МОТОР_ПОКРЕНУТ", modal_err: "МОДАЛ_НИЈЕ_НАЂЕН", textarea_err: "ПОЉЕ_НИЈЕ_НАЂЕНО", empty_err: "ТЕКСТ_ЈЕ_ПРАЗАН", ready: "СПРЕМАН", inject: "ИНЈЕКТУЈ", typo: "ГРЕШКА & ПОПРАВКА", pause: "РАЗМИШЉАМ...", success: "ИЗВРШЕЊЕ_УСПЕШНО", term: "ПРЕКИНУТО_КОРИСНИКОМ", standby: "СТАТУС: ЧЕКАЊЕ", injecting: "СТАТУС: ИНЈЕКТУЈЕМ...", init_btn: "ПОКРЕНИ_МОТОР", term_btn: "ПРЕКИНИ_ИЗВРШЕЊЕ", title: "QUASAR_ИНТЕРФЕЈС", freq: "ФРЕКВЕНЦИЈА_ИНЈЕКТОВАЊА" },
            HR: { label: "HR 🇭🇷", chars: "abcčćdđefghijkllmnnjoprsštuvzž", start: "MOTOR_POKRENUT", modal_err: "MODAL_NIJE_PRONAĐEN", textarea_err: "TEXTAREA_NIJE_PRONAĐEN", empty_err: "TEKST_JE_PRAZAN", ready: "SPREMAN", inject: "INJEKTIRAJ", typo: "GREŠKA & POPRAVAK", pause: "RAZMIŠLJAM...", success: "IZVRŠENJE_USPJEŠNO", term: "PREKINUTO_KORISNIKOM", standby: "STATUS: ČEKANJE", injecting: "STATUS: INJEKTIRAM...", init_btn: "POKRENI_MOTOR", term_btn: "PREKINI_IZVRŠENJE", title: "QUASAR_SUČELJE", freq: "FREKVENCIJA_INJEKCIJE" },
            SK: { label: "SK 🇸🇰", chars: "aáäbcčdďeéfghiíjklĺmnoóôpqrŕsštťuúvwxyýzž", start: "MOTOR_SPUSTENÝ", modal_err: "MODAL_NENÁJDENÝ", textarea_err: "TEXTAREA_NENÁJDENÁ", empty_err: "TEXT_JE_PRÁZDNY", ready: "PRIPRAVENÝ", inject: "INJEKTOVAŤ", typo: "PREKLEP & OPRAVA", pause: "PREMÝŠĽAM...", success: "VYKONANIE_ÚSPEŠNÉ", term: "UKONČENÉ_POUŽÍVATEĽOM", standby: "STAV: POHOTOVOSŤ", injecting: "STAV: INJEKTUJEM...", init_btn: "SPUSTIŤ_MOTOR", term_btn: "UKONČIŤ_VYKONANIE", title: "ROZHRANIE_QUASAR", freq: "FREKVENCIA_INJEKCIE" },
            BG: { label: "BG 🇧🇬", chars: "абвгдежзийклмнопрстуфхцчшщъьюя", start: "МОТОРЪТ_Е_СТАРТИРАН", modal_err: "МОДАЛЪТ_НЕ_Е_НАМЕРЕН", textarea_err: "ПОЛЕТО_НЕ_Е_НАМЕРЕНО", empty_err: "ТЕКСТЪТ_Е_ПРАЗЕН", ready: "ГОТОВ", inject: "ИНЖЕКТИРАНЕ", typo: "ГРЕШКА & ПОПРАВКА", pause: "МИСЛЯ...", success: "УСПЕШНО_ИЗПЪЛНЕНИЕ", term: "ПРЕКРАТЕНО_ОТ_ПОТРЕБИТЕЛЯ", standby: "СТАТУС: ИЗЧАКВАНЕ", injecting: "СТАТУС: ИНЖЕКТИРАНЕ...", init_btn: "СТАРТИРАНЕ_НА_МОТОРА", term_btn: "ПРЕКРАТЯВАНЕ_НА_ИЗПЪЛНЕНИЕТО", title: "ИНТЕРФЕЙС_QUASAR", freq: "ЧЕСТОТА_НА_ИНЖЕКТИРАНЕ" },
            UK: { label: "UK 🇺🇦", chars: "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя", start: "ДВИГУН_ЗАПУЩЕНО", modal_err: "МОДАЛЬНЕ_ВІКНО_НЕ_ЗНАЙДЕНО", textarea_err: "ТЕКСТОВЕ_ПОЛЕ_НЕ_ЗНАЙДЕНО", empty_err: "ТЕКСТ_ПОРОЖНІЙ", ready: "ГОТОВИЙ", inject: "ВПРЕСКУВАННЯ", typo: "ПОМИЛКА & ВИПРАВЛЕННЯ", pause: "ДУМАЮ...", success: "ВИКОНАННЯ_УСПІШНЕ", term: "ЗАВЕРШЕНО_КОРИСТУВАЧЕМ", standby: "СТАТУС: ОЧІКУВАННЯ", injecting: "СТАТУС: ВПРЕСКУВАННЯ...", init_btn: "ЗАПУСТИТИ_ДВИГУН", term_btn: "ЗАВЕРШИТИ_ВИКОНАННЯ", title: "ІНТЕРФЕЙС_QUASAR", freq: "ЧАСТОТА_ВПРЕСКУВАННЯ" },
            NO: { label: "NO 🇳🇴", chars: "abcdefghijklmnopqrstuvwxyzæøå", start: "MOTOR_STARTET", modal_err: "MODAL_IKKE_FUNNET", textarea_err: "TEKSTFELT_IKKE_FUNNET", empty_err: "TEKST_ER_TOM", ready: "KLAR", inject: "INJISER", typo: "SKRIVEFEIL & RETTING", pause: "TENKER...", success: "UTFØRELSE_VELLYKKET", term: "AVBRUTT_AV_BRUKER", standby: "STATUS: VENTER", injecting: "STATUS: INJISERER...", init_btn: "START_MOTOR", term_btn: "AVSLUTT_UTFØRELSE", title: "QUASAR_GRENSESNITT", freq: "INJEKSJONSFREKVENS" },
            ET: { label: "ET 🇪🇪", chars: "abcdefghijklmnopqrstuvwxyzäõüö", start: "MOOTOR_KÄIVITATUD", modal_err: "MODAALI_EI_LEITUD", textarea_err: "TEKSTIALA_EI_LEITUD", empty_err: "TEKST_ON_TÜHI", ready: "VALMIS", inject: "INJITSEERI", typo: "TRÜKIVIGA & PARANDUS", pause: "MÕTLEN...", success: "TÄITMINE_EDUkas", term: "KASUTAJA_POOLT_LÕPETATUD", standby: "OLEK: OOTEL", injecting: "OLEK: INJITSEERIMINE...", init_btn: "KÄIVITA_MOOTOR", term_btn: "LÕPETA_TÄITMINE", title: "QUASAR_LIIDES", freq: "INJEKTSIOONI_SAGEDUS" },
            LT: { label: "LT 🇱🇹", chars: "aąbcčdeęėfghiįyjlmnoprsštuųūvzž", start: "VARIKLIS_ĮJUNGTAS", modal_err: "MODALIS_NERASTAS", textarea_err: "TEKSTO_LAUKAS_NERASTAS", empty_err: "TEKSTAS_TUŠČIAS", ready: "PARUOŠTA", inject: "ĮPURKŠTI", typo: "KLAIDA & TAISYMAS", pause: "MĄSTAU...", success: "VYKDYMAS_SĖKMINGAS", term: "NUTRAUKTA_VARTOTOJO", standby: "BŪSENA: LAUKIAMA", injecting: "BŪSENA: ĮPURKŠTIMAS...", init_btn: "ĮJUNGTI_VARIKLĮ", term_btn: "NUTRAUKTI_VYKDYMĄ", title: "QUASAR_SĄSAJA", freq: "ĮPURŠKIMO_DAŽNIS" },
            LV: { label: "LV 🇱🇻", chars: "aābcčdeēfghiīķlļmnņoprsštuūvzž", start: "DZINĒJS_IESLĒGTS", modal_err: "MODĀLS_NAV_ATRSTS", textarea_err: "TEKSTA_LAUKS_NAV_ATRSTS", empty_err: "TEKSTS_IR_TUKŠS", ready: "GATAVS", inject: "INJEKCIJA", typo: "KĻŪDA & LABOŠANA", pause: "DOMĀJU...", success: "IZPILDE_VEIKSMĪGA", term: "LIETOTĀJA_PĀRTRAUKTS", standby: "STATUSS: GAIDĪŠANA", injecting: "STATUSS: INJEKCIJA...", init_btn: "IESLĒGT_DZINĒJU", term_btn: "PĀRTRAUKT_IZPILDI", title: "QUASAR_INTERFEISS", freq: "INJEKCIJAS_BIEŽUMS" },
            IS: { label: "IS 🇮🇸", chars: "aábcdðeéfghiíjklmnoóprstuúvxyýþæö", start: "VÉL_RÆST", modal_err: "MODAL_FANST_EKKI", textarea_err: "TEXTASVÆÐI_FANST_EKKI", empty_err: "TEXTI_ER_TÓMUR", ready: "TILBÚINN", inject: "SPRAUTA", typo: "VILLA & LAGFÆRING", pause: "HUGSA...", success: "KEYRSLA_HEPPNAÐIST", term: "NOTANDI_HÆTTI_VIÐ", standby: "STAÐA: BÍÐUR", injecting: "STAÐA: SPRAUTAR...", init_btn: "RÆSA_VÉL", term_btn: "HÆTTA_KEYRSLU", title: "QUASAR_VIÐMÓT", freq: "INNSPRÝTINGARTÍÐNI" },
            FA: { label: "FA 🇮🇷", chars: "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی", start: "موتور شروع شد", modal_err: "مدال پیدا نشد", textarea_err: "ناحیه متن پیدا نشد", empty_err: "متن خالی است", ready: "آماده", inject: "تزریق", typo: "غلط تایپی & اصلاح", pause: "در حال فکر کردن...", success: "اجرا موفقیت‌آمیز بود", term: "توسط کاربر متوقف شد", standby: "وضعیت: آماده‌باش", injecting: "وضعیت: در حال تزریق...", init_btn: "راه‌اندازی موتور", term_btn: "توقف اجرا", title: "رابط_QUASAR", freq: "فرکانس تزریق" },
            UR: { label: "UR 🇵🇰", chars: "ابپتٹثجچحخدڈذرزڑسشصضطظعغفقکگلمنںوہیءئآ", start: "انجن شروع ہو گیا", modal_err: "موڈل نہیں ملا", textarea_err: "ٹیکسٹ ایریا نہیں ملا", empty_err: "ٹیکسٹ خالی ہے", ready: "تیار", inject: "انجیکشن", typo: "ٹائپو & اصلاح", pause: "سوچ رہا ہے...", success: "کامیاب تکمیل", term: "صارف کی طرف سے ختم", standby: "حیثیت: اسٹینڈ بائی", injecting: "حیثیت: انجیکشن ہو رہا ہے...", init_btn: "انجن شروع کریں", term_btn: "عمل ختم کریں", title: "QUASAR_انٹرفیس", freq: "انجیکشن کی تعدد" },
            AZ: { label: "AZ 🇦🇿", chars: "abcçdeəfgğhıijkqlmnoöprsştuüvyz", start: "MÜHƏRRİK_İŞƏ_SALINDI", modal_err: "MODAL_TAPILMADI", textarea_err: "TEXTAREA_TAPILMADI", empty_err: "MƏTN_BOŞDUR", ready: "HAZIRDIR", inject: "İNYEKSIYA", typo: "SƏHV & DÜZƏLİŞ", pause: "DÜŞÜNÜR...", success: "İCRA_UĞURLU_OLDU", term: "İSTİFADƏÇİ_TƏRƏFİNDƏN_DAYANDIRILDI", standby: "STATUS: GÖZLƏYİR", injecting: "STATUS: İNYEKSIYA_EDİLİR...", init_btn: "MÜHƏRRİKI_İŞƏ_SAL", term_btn: "İCRANI_DAYANDIR", title: "QUASAR_İNTERFEYSİ", freq: "İNYEKSIYA_TEZLIYI" },
            KK: { label: "KK 🇰🇿", chars: "аәбвгғдеёжзийкқлмнңоөпрстуұүфхһцчшщъіьэюя", start: "ҚОЗҒАЛТҚЫШ_ІСКЕ_ҚОСЫЛДЫ", modal_err: "МОДАЛЬДІК_ТЕРЕЗЕ_ТАБЫЛМАДЫ", textarea_err: "МӘТІН_АЙМАҒЫ_ТАБЫЛМАДЫ", empty_err: "МӘТІН_БОС", ready: "ДАЙЫН", inject: "ИНЪЕКЦИЯ", typo: "ҚАТЕ & ТҮЗЕТУ", pause: "ОЙЛАНУ...", success: "ОРЫНДАЛДЫ", term: "ПАЙДАЛАНУШЫ_ТОҚТАТТЫ", standby: "КҮЙІ: КҮТУ", injecting: "КҮЙІ: ИНЪЕКЦИЯ...", init_btn: "ҚОЗҒАЛТҚЫШТЫ_ІСКЕ_ҚОСУ", term_btn: "ОРЫНДАУДЫ_ТОҚТАТУ", title: "QUASAR_ИНТЕРФЕЙСІ", freq: "ИНЪЕКЦИЯ_ЖИІЛІГІ" },
        };
        function updatePanelLanguage() {
            const l = quasarLanguages[window.quasarLang] || quasarLanguages.TR;
            document.getElementById('quasar-drag-label').innerHTML = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z" fill="#ff0000"></path></svg> ${l.title}` ;
            document.getElementById('quasar-freq-label').innerHTML = `<span>🚨 ${l.freq}</span>`;
            document.getElementById('quasar-wpm-display').innerHTML = `SPEED: <span>${window.quasarBotWPM} WPM</span>`;
            const btn = document.getElementById('quasar-bot-button');
            const status = document.getElementById('quasar-status-text');
            if (window.isQuasarBotRunning) {
                btn.textContent = l.term_btn;
                status.textContent = l.injecting;
            } else {
                btn.textContent = l.init_btn;
                status.textContent = l.standby;
            }
        }
        function quasarLog(mesaj) {
            const consoleBox = document.getElementById('quasar-console-box');
            if (consoleBox) {
                consoleBox.textContent = mesaj;
                consoleBox.scrollLeft = consoleBox.scrollWidth;
            }
        }
        function applyQuasarShield() {
            if (!window.quasarShieldMode) return;
            const fakeUserAgents = [
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.5; rv:126.0) Gecko/20100101 Firefox/126.0",
                "Mozilla/5.0 (X11; Linux i686; rv:125.0) Gecko/20100101 Firefox/125.0",
                "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0",
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
                "Mozilla/5.0 (iPad; CPU OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.2592.56",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.2535.51",
                "Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.55 Mobile Safari/537.36",
                "Mozilla/5.0 (Linux; Android 13; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.165 Mobile Safari/537.36",
                "Mozilla/5.0 (Linux; Android 12; SM-A536B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.55 Mobile Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/111.0.0.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Vivaldi/6.7.3329.27 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Brave/125.0.0.0 Safari/537.36"
            ];
            const selectedUA = fakeUserAgents[Math.floor(Math.random() * fakeUserAgents.length)];
            try {
                Object.defineProperty(navigator, 'userAgent', { get: function() { return selectedUA; }, configurable: true });
                Object.defineProperty(navigator, 'webdriver', { get: function() { return false; }, configurable: true });
                Object.defineProperty(navigator, 'languages', { get: function() { return ['en-US', 'en']; }, configurable: true });
                Object.defineProperty(screen, 'width', { get: function() { return 1920; }, configurable: true });
                Object.defineProperty(screen, 'height', { get: function() { return 1080; }, configurable: true });
                Object.defineProperty(screen, 'availWidth', { get: function() { return 1920; }, configurable: true });
                Object.defineProperty(screen, 'availHeight', { get: function() { return 1040; }, configurable: true });
                quasarLog("SHIELD: PROTOTYPES_HOOKED");
            } catch (e) {
                quasarLog("SHIELD_ERROR: HOOK_FAILED");
            }
        }
        window.QuasarTypeBot = async function(options = {}) {
            const l = typeof quasarLanguages !== 'undefined' ? (quasarLanguages[window.quasarLang] || quasarLanguages.TR) : {};
            if (window.isQuasarBotRunning) return false;
            window.isQuasarBotRunning = true;

            const aktifModal = [...document.querySelectorAll('.modal.show')]
                .find(el => getComputedStyle(el).display === 'block');

            if (!aktifModal) {
                window.isQuasarBotRunning = false;
                if (typeof botButonunuSıfırla === 'function') botButonunuSıfırla();
                return false;
            }

            const kaynakTextarea = [...aktifModal.querySelectorAll('textarea')]
                .find(el => el.classList.contains('yazilacak-metin') || el.id.startsWith('yazialani-sinavmodu'));
            const hedefTextarea = [...aktifModal.querySelectorAll('textarea')]
                .find(el => el.classList.contains('yazilan-metin') && !el.disabled && !el.readOnly);

            if (!kaynakTextarea || !hedefTextarea) {
                window.isQuasarBotRunning = false;
                if (typeof botButonunuSıfırla === 'function') botButonunuSıfırla();
                return false;
            }

            let hamMetin = kaynakTextarea.value || kaynakTextarea.textContent || kaynakTextarea.innerText || "";
            let temizMetin = hamMetin.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '').replace(/\s+/g, ' ').trim();

            let currentWord = 0;
            const nativeValueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            function getDynamicDelay() {
                const wpm = (window.quasarBotWPM || 100) * 2;
                const base = 60000 / (wpm * 5);
                return window.quasarHumanMode ? base * (Math.random() * 0.4 + 0.8) : base;
            }

            async function typeChar(char) {
                if (!hedefTextarea) return;

                // 1. Hazırlık: Odaklanma
                if (document.activeElement !== hedefTextarea) {
                    hedefTextarea.focus();
                }

                // 2. Klavye Özelliklerini Hazırla
                const isSpace = char === " ";
                const isUpperCase = !isSpace && char === char.toUpperCase() && char !== char.toLowerCase();
                const keyCode = isSpace ? 32 : char.charCodeAt(0);
                const code = isSpace ? "Space" : "Key" + char.toUpperCase();

                // 3. Shift Tuşu (Başlangıç)
                if (isUpperCase) {
                    hedefTextarea.dispatchEvent(new KeyboardEvent("keydown", { key: "Shift", code: "ShiftLeft", keyCode: 16, which: 16, bubbles: true }));
                }

                // 4. Yazma İşlemi (isTrusted hatası vermeyen güvenli yöntem)
                // execCommand metni yazar ve sitenin klavye olaylarını tetiklemez (korumayı aşar)
                document.execCommand('insertText', false, char);

                // 5. Olay Dizisi (Sitenin "klavye basıldı" dinleyicilerini tetiklemek için)
                hedefTextarea.dispatchEvent(new KeyboardEvent("keydown", { key: char, code, keyCode, which: keyCode, bubbles: true, cancelable: true }));
                hedefTextarea.dispatchEvent(new InputEvent("beforeinput", { bubbles: true, cancelable: true, inputType: "insertText", data: char }));
                hedefTextarea.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true, inputType: "insertText", data: char }));
                hedefTextarea.dispatchEvent(new KeyboardEvent("keyup", { key: char, code, keyCode, which: keyCode, bubbles: true, cancelable: true }));

                // 6. Shift ve Space (Bitiş)
                if (isUpperCase) {
                    hedefTextarea.dispatchEvent(new KeyboardEvent("keyup", { key: "Shift", code: "ShiftLeft", keyCode: 16, which: 16, bubbles: true }));
                }
                if (isSpace) {
                    hedefTextarea.dispatchEvent(new KeyboardEvent("keypress", { key: " ", code: "Space", keyCode: 32, which: 32, bubbles: true, cancelable: true }));
                }

                // 7. Framework Senkronizasyonu (React/Vue/Angular için zorunlu)
                const descriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
                if (descriptor && descriptor.set) {
                    descriptor.set.call(hedefTextarea, hedefTextarea.value);
                }
                // React Tracker (Input kutusu boş kalmasın diye)
                if (hedefTextarea._valueTracker) {
                    hedefTextarea._valueTracker.setValue(hedefTextarea.value);
                }
            }


            async function deleteChar() {
                nativeValueSetter.call(hedefTextarea, hedefTextarea.value.slice(0, -1));
                hedefTextarea.dispatchEvent(new Event('input', { bubbles: true }));
            }

            hedefTextarea.focus();
            const karakterler = temizMetin.split("");

            let mevcutKelime = "";
            let toplamKelimeSayisi = karakterler.join('').split(/\s+/).filter(w => w.length > 0).length;
            let tamamlananKelimeSayisi = 0;

            for (let i = 0; i < karakterler.length; i++) {
                if (!window.isQuasarBotRunning) break;

                let char = karakterler[i];
                mevcutKelime += char;

                // Hata simülasyonu (Aynı)
                if (window.quasarHumanMode && Math.random() < 0.03) {
                    let fakeChar = String.fromCharCode(char.charCodeAt(0) + (Math.random() > 0.5 ? 1 : -1));
                    await typeChar(fakeChar);
                    await sleep(150 + Math.random() * 100);
                    await deleteChar();
                    await sleep(100);
                }

                await typeChar(char);

                // KELİME BAZLI LOG MANTIĞI:
                // Eğer bir boşluğa geldiysen veya metnin sonuna geldiysen log yaz
                if (char === ' ' || i === karakterler.length - 1) {
                    tamamlananKelimeSayisi++;
                    quasarLog(`${l.inject}: Kelime ${tamamlananKelimeSayisi}/${toplamKelimeSayisi} tamamlandı.`);
                    mevcutKelime = ""; // Biriktiriciyi sıfırla
                }

                // Gecikme ayarları (Aynı)
                if (char === ' ') {
                    await sleep(getDynamicDelay() * (window.quasarHumanMode ? 3 : 1));
                } else if (['.', '!', '?'].includes(char)) {
                    await sleep(getDynamicDelay() * 10);
                } else {
                    await sleep(getDynamicDelay());
                }
            }

            window.isQuasarBotRunning = false;
            if (typeof botButonunuSıfırla === 'function') botButonunuSıfırla();
            return true;
        };

// --- GÜVENLİKLİ ARKA PLAN OTOMATİK EKRAN TARAYICI (OBSERVER) ---
        window.quasarAutoLock = false;

        setInterval(async () => {
            if (window.quasarAutoMode && !window.isQuasarBotRunning && !window.quasarAutoLock) {
                const aktifModal = [...document.querySelectorAll('.modal.show')]
                    .find(el => getComputedStyle(el).display === 'block');

                if (aktifModal) {
                    const kaynak = aktifModal.querySelectorAll('textarea');
                    if (kaynak.length >= 2) {
                        window.quasarAutoLock = true;

                        const l = quasarLanguages[window.quasarLang] || quasarLanguages.TR;
                        const delayMs = Math.floor(3000 + Math.random() * 2000);
                        quasarLog(`HUMAN_WAIT: ${(delayMs/1000).toFixed(1)}s...`);

                        await new Promise(resolve => setTimeout(resolve, delayMs));

                        const halaAktifMi = [...document.querySelectorAll('.modal.show')]
                            .find(el => getComputedStyle(el).display === 'block');

                        if (!halaAktifMi) {
                            window.quasarAutoLock = false;
                            quasarLog("WAIT_CANCELLED");
                            return;
                        }

                        const btn = document.getElementById('quasar-bot-button');
                        const status = document.getElementById('quasar-status-text');

                        btn.textContent = l.term_btn;
                        btn.style.background = '#ff0000';
                        btn.style.color = '#000000';
                        status.textContent = l.injecting;

                        window.QuasarTypeBot();
                        window.quasarAutoLock = false;
                    }
                }
            }
        }, 400);

// --- SAF KIRMIZI AGRESİF INTERFACE PANEL TASARIMI ---
        let QuasarPanel = document.createElement('div');
        QuasarPanel.id = 'quasar-bot-panel';
        QuasarPanel.style.cssText = `
position: fixed;
bottom: 25px;
right: 25px;
z-index: 999999;
display: flex;
flex-direction: column;
gap: 15px;
padding: 16px;
background: #060101;
border: 2px solid #ff0000;
border-radius: 2px;
box-shadow: 0 0 40px rgba(255, 0, 0, 0.4);
font-family: 'Courier New', Courier, monospace;
width: 320px;
box-sizing: border-box;
user-select: none;
cursor: move;
transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1), padding 0.2s ease, height 0.2s ease;
`;

        let styleElement = document.createElement('style');
        styleElement.innerHTML = `
        body {
  font-family: "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif;
}
#quasar-bot-panel *, #quasar-bot-panel *::before, #quasar-bot-panel *::after { box-sizing: border-box; }
#quasar-range-input { -webkit-appearance: none; width: 100%; background: transparent; outline: none; margin: 8px 0; }
#quasar-range-input::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: #1a0000; border: 1px solid #ff0000; }
#quasar-range-input::-webkit-slider-thumb { height: 16px; width: 12px; background: #ff0000; cursor: pointer; -webkit-appearance: none; margin-top: -6px; box-shadow: 0 0 10px #ff0000; border: none; border-radius: 0px; }
/* --- CHROME, SAFARI, EDGE, OPERA (Webkit) --- */
#quasar-range-input::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  background: #1a0000;
  border: 1px solid #ff0000;
}

#quasar-range-input::-webkit-slider-thumb {
  height: 16px;
  width: 12px;
  background: #ff0000;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px; /* Track'in ortasına gelmesi için */
  box-shadow: 0 0 10px #ff0000;
  border: none;
  border-radius: 0px;
}

/* --- FIREFOX --- */
#quasar-range-input::-moz-range-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  background: #1a0000;
  border: 1px solid #ff0000;
}

#quasar-range-input::-moz-range-thumb {
  height: 16px;
  width: 12px;
  background: #ff0000;
  cursor: pointer;
  box-shadow: 0 0 10px #ff0000;
  border: none;
  border-radius: 0px;
}
#quasar-console-box::-webkit-scrollbar { height: 4px; }
#quasar-console-box::-webkit-scrollbar-track { background: #070000; }
#quasar-console-box::-webkit-scrollbar-thumb { background: #ff0000; }

.quasar-select {
background: #000000; color: #ff0000; border: 1px solid #ff0000;
font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold;
padding: 4px 4px; outline: none; cursor: pointer; width: 35%; height: 32px;
}
.quasar-utility-btn, .quasar-utility-btn-v1 {
background: transparent; color: #ff0000; border: 1px solid #ff0000;
cursor: pointer; font-size: 12px; height: 32px; width: 21%;
display: flex; align-items: center; justify-content: center; transition: all 0.15s ease-in-out;
filter: grayscale(100%);
}
.quasar-utility-btn-v1{
filter: grayscale(0);
}
.quasar-utility-btn:hover {
box-shadow: 0 0 7px #ff0000;
}
.quasar-utility-btn.active {
background-color: #0d0d0d;
box-shadow: 0 0 14px #ff0000;
filter: grayscale(0);
}
.quasar-toggle-btn {
border: none !important; padding: 0 !important; width: 34px !important; height: 24px !important;
font-size: 13px !important; font-weight: bold !important; background: transparent !important; display: flex !important; align-items: center !important; justify-content: center !important;
}
`;
        document.head.appendChild(styleElement);

// --- SATIR 1: INTERFACE BAŞLIĞI VE KÜÇÜLTME ---
        let HeaderContainer = document.createElement('div');
        HeaderContainer.style.cssText = `display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #ff0000; padding-bottom: 8px; width: 100%;`;

        let DragLabel = document.createElement('div');
        DragLabel.id = 'quasar-drag-label';
        DragLabel.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z" fill="#ff0000"></path></svg> ${quasarLanguages.TR.title}` ;
        DragLabel.style.cssText = `color: #ff0000; font-size: 11px; font-weight: bold; letter-spacing: 0.5px; white-space: nowrap;`;


        let MinimizeButton = document.createElement('button');
        MinimizeButton.className = "quasar-utility-btn-v1 quasar-toggle-btn";
        MinimizeButton.innerHTML = "[-]";

        HeaderContainer.appendChild(DragLabel);
        HeaderContainer.appendChild(MinimizeButton);
        QuasarPanel.appendChild(HeaderContainer);

// --- SATIR 2: SİSTEM KONTROL ŞERİDİ ---
        let ControlsRow = document.createElement('div');
        ControlsRow.id = 'quasar-controls-row';
        ControlsRow.style.cssText = `display: flex; gap: 5px; width: 100%; justify-content: space-between; align-items: center; background: rgba(255,0,0,0.03); padding: 4px; border: 1px solid rgba(255,0,0,0.15);`;

        let LangSelect = document.createElement('select');
        LangSelect.className = 'quasar-select';
        Object.keys(quasarLanguages).forEach(key => {
            let opt = document.createElement('option');
            opt.value = key;
            opt.innerHTML = quasarLanguages[key].label;
            LangSelect.appendChild(opt);
        });

        LangSelect.addEventListener('change', function(e) {
            window.quasarLang = this.value;
            updatePanelLanguage();
            quasarLog(`LANG: ${window.quasarLang}`);
        });
        LangSelect.addEventListener('mousedown', (e) => e.stopPropagation());

        let HumanModeButton = document.createElement('button');
        HumanModeButton.className = "quasar-utility-btn";
        HumanModeButton.innerHTML = `<svg width="20px" height="20px" fill="#ff0000" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 155.739 155.739" xml:space="preserve"><path d="M93.192,25.738c8.326,0,15.073,6.752,15.073,15.081c0,8.325-6.747,15.078-15.073,15.078 c-8.33,0-15.079-6.753-15.079-15.078C78.113,32.49,84.862,25.738,93.192,25.738z"></path> <path d="M101.102,73.074c5.354,0,9.692,4.339,9.692,9.691c0,5.356-4.338,9.697-9.692,9.697c-5.356,0-9.693-4.341-9.693-9.697 C91.409,77.413,95.746,73.074,101.102,73.074z"></path> <path d="M52.781,155.739h86.949c0,0-25.232-20.279-24.701-42.513c0.317-12.388,24.701-28.158,24.58-62.58 c-0.076-17.311-16.865-46.088-45.371-49.675C65.724-2.62,44.386,3.656,35.062,21.235c-9.335,17.57-10.042,32.999-9.325,35.861 c0.726,2.876,3.769,8.255,3.769,8.255S15.16,87.405,16.049,90.988c0.908,3.596,10.748,5.527,10.748,5.527s0.892,2.497-0.906,7.335 c-1.795,4.846,3.338,10.468,4.88,12.43c1.519,1.954-2.158,8.062-0.908,11.476c1.253,3.398,7.176,7.523,13.986,6.632 c6.819-0.902,15.566-2.504,18.604-3.054C69.312,147.479,52.781,155.739,52.781,155.739z M117.141,90.021l-2.947,4.525 l-2.867-1.883c-1.315,1.353-2.919,2.452-4.714,3.207l0.708,3.371l-5.276,1.1l-0.706-3.364c-1.97,0.032-3.864-0.335-5.602-1.051 l-1.883,2.872l-4.527-2.955l1.877-2.872c-1.346-1.312-2.451-2.912-3.199-4.706l-3.376,0.705l-1.11-5.285l3.38-0.701 c-0.027-1.952,0.333-3.852,1.045-5.598l-2.871-1.882l2.952-4.522l2.876,1.879c1.312-1.36,2.908-2.458,4.711-3.212l-0.708-3.368 l5.28-1.111l0.708,3.374c1.952-0.033,3.853,0.338,5.599,1.048l1.882-2.875l4.52,2.949l-1.878,2.878 c1.351,1.313,2.456,2.905,3.208,4.711l3.357-0.7l1.111,5.28l-3.365,0.7c0.032,1.958-0.338,3.857-1.051,5.604L117.141,90.021z M67.762,30.636l5.218,1.207c1.188-2.685,2.925-5.145,5.157-7.213L75.3,20.086l7.115-4.449l2.84,4.545 c2.835-1.095,5.807-1.581,8.739-1.475l1.2-5.204l8.189,1.883l-1.204,5.203c2.682,1.196,5.128,2.931,7.204,5.158l4.539-2.838 l4.454,7.122l-4.547,2.829c1.097,2.837,1.576,5.811,1.479,8.741l5.202,1.207l-1.888,8.181l-5.215-1.207 c-1.182,2.679-2.917,5.146-5.149,7.212l2.842,4.54l-7.124,4.448l-2.831-4.539c-2.846,1.1-5.817,1.587-8.748,1.475l-1.206,5.204 l-8.178-1.888l1.195-5.204c-2.676-1.186-5.135-2.925-7.194-5.155l-4.55,2.841l-4.45-7.122l4.55-2.834 c-1.1-2.843-1.581-5.806-1.48-8.736l-5.211-1.204L67.762,30.636z"></path></svg>        `;
        HumanModeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            window.quasarHumanMode = !window.quasarHumanMode;
            if (window.quasarHumanMode) {
                this.classList.add('active');
                quasarLog("HUMAN_RHYTHM_ON");
            } else {
                this.classList.remove('active');
                quasarLog("CONSTANT_SPEED_ON");
            }
        });
        HumanModeButton.addEventListener('mousedown', (e) => e.stopPropagation());

// Otomatik Başlatma Modu Butonu (⚡)
        let AutoModeButton = document.createElement('button');
        AutoModeButton.className = "quasar-utility-btn";
        AutoModeButton.innerHTML = `<svg width="20px" height="20px" viewBox="-1 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>lightning [#ff0000]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-101.000000, -2559.000000)" fill="#ff0000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M49.27,2409 L53,2404.524 L53,2409 L49.27,2409 Z M55,2409 L58.73,2409 L55,2413.476 L55,2409 Z M63,2407 L55,2407 L55,2399 L45,2411 L53,2411 L53,2419 L63,2407 Z" id="lightning-[#ff0000]"> </path> </g> </g> </g> </g></svg>`;
        AutoModeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            window.quasarAutoMode = !window.quasarAutoMode;
            if (window.quasarAutoMode) {
                this.classList.add('active');
                quasarLog("AUTO_TRIGGER_ARMED");
            } else {
                this.classList.remove('active');
                quasarLog("AUTO_TRIGGER_DISABLED");
            }
        });
        AutoModeButton.addEventListener('mousedown', (e) => e.stopPropagation());

        let QuasarAutomationButton = document.createElement('button');
        QuasarAutomationButton.className = 'quasar-utility-btn __quasar__automation__v1';
        QuasarAutomationButton.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C10.8954 1 10 1.89543 10 3C10 3.74028 10.4022 4.38663 11 4.73244V7H6C4.34315 7 3 8.34315 3 10V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V10C21 8.34315 19.6569 7 18 7H13V4.73244C13.5978 4.38663 14 3.74028 14 3C14 1.89543 13.1046 1 12 1ZM5 10C5 9.44772 5.44772 9 6 9H7.38197L8.82918 11.8944C9.16796 12.572 9.86049 13 10.618 13H13.382C14.1395 13 14.832 12.572 15.1708 11.8944L16.618 9H18C18.5523 9 19 9.44772 19 10V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V10ZM13.382 11L14.382 9H9.61803L10.618 11H13.382Z"></path>
                <circle class="q-left_eye" cx="9" cy="16" r="1.5" transform="translate(0.8577630088292432, 0.5140453488596154)"></circle>
                <circle class="q-right_eye" cx="15" cy="16" r="1.5" transform="translate(0.8546682509336313, 0.5191745186794585)"></circle>
                <path d="M1 14C0.447715 14 0 14.4477 0 15V17C0 17.5523 0.447715 18 1 18C1.55228 18 2 17.5523 2 17V15C2 14.4477 1.55228 14 1 14Z"></path>
                <path d="M22 15C22 14.4477 22.4477 14 23 14C23.5523 14 24 14.4477 24 15V17C24 17.5523 23.5523 18 23 18C22.4477 18 22 17.5523 22 17V15Z"></path>
            </svg>
        `;
        QuasarAutomationButton.addEventListener('click', function () {
            if (!AutoModeButton.classList.contains('active')){
                AutoModeButton.click();
            }

            this.classList.add('active');
            quasarLog("AUTOMATİON_TRIGGER_ARMED");
            let clicked = new WeakSet();
            let isProcessing = false;
            let lastExecution = 0; // Throttle kontrolü için

            function safeClick(element, delay, btnName, onComplete) {
                if (!element || clicked.has(element)) return;

                clicked.add(element);
                isProcessing = true;

                console.log(`[BOT] -> Sinyal: "${btnName}" -> ${delay}ms sonra...`);

                setTimeout(() => {
                    try {
                        if (element) {
                            element.focus?.();
                            element.click();
                            console.log(`[BOT] -> Tıklandı: "${btnName}"`);
                        }
                    } catch(e) {
                        console.log(`[BOT] -> Hata [${btnName}]:`, e);
                    }

                    // Kilit süresini 800ms'den 150ms'ye düşürdük. Seri tıklamalar için ideal.
                    setTimeout(() => {
                        isProcessing = false;
                        if (onComplete) onComplete();
                    }, 150);
                }, delay);
            }

            const observer = new MutationObserver(() => {
                // PERFORMANS KORUMASI (Throttle): Fonksiyonun ardı ardına nanosaniyede bir çalışmasını engeller (Hızı uçurur)
                const now = Date.now();
                if (now - lastExecution < 30) return; // 30ms'de birden daha sık çalışma
                lastExecution = now;

                if (isProcessing) return;

                // 0. ANA MODELİ AÇ
                const quasarModel = document.querySelector('[data-bs-target="#odaolusturmodal"]') || document.querySelector('[data-target="#odaolusturmodal"]');
                const tostElement = document.getElementById('duelloToast')?.getElementsByTagName('strong')[0];
                const tostYazisi = tostElement ? tostElement.textContent.trim() : "";

                const modalElement = document.querySelector('#odaolusturmodal');
                const isModalOpen = modalElement ? modalElement.classList.contains('show') : false;

                // Hatalı scroll mantığı düzeltildi: Element VARSA ve görünmüyorsa kaydır
                if (quasarModel && quasarModel.getBoundingClientRect().top > window.innerHeight) {
                    quasarModel.scrollIntoView({ behavior: 'auto', block: 'center' }); // smooth yerine auto (anında)
                }

                if (quasarModel && tostYazisi !== 'Rakip Bekleniyor...' && !isModalOpen && !clicked.has(quasarModel)) {
                    // Gecikmeleri minimuma indirdik (50ms - 150ms arası rastgele)
                    safeClick(quasarModel, 50 + Math.floor(Math.random() * 100), "0. ANA MODELİ AÇ");
                    return;
                }

                // 1. ODA OLUŞTUR
                const createBtn = document.querySelector('[onclick="odayiolustur()"]');
                if (createBtn && !clicked.has(createBtn)) {
                    safeClick(createBtn, 300 + Math.floor(Math.random() * 100), "1. ODA OLUŞTUR");
                    return;
                }

                // 3. SWAL KABUL
                const kabulBtn = document.querySelector('.swal2-confirm');
                if (kabulBtn && !clicked.has(kabulBtn)) {
                    safeClick(kabulBtn, 100 + Math.floor(Math.random() * 100), "3. SWAL KABUL");
                    return;
                }



                // 5. ODADAN ÇIK VE DÖNGÜYÜ BAŞA SAR
                const offBtn = document.querySelector('.home-button[onclick="odadancik()"]') || document.querySelector('[onclick*="anasayfayadon"]');
                const finText = document.querySelector('.matchResult') || document.querySelector('#sonucEkrani.show');

                if (finText && offBtn) {
                    const isFinTextVisible = finText.getBoundingClientRect().width > 0;
                    const isOffBtnVisible = offBtn.getBoundingClientRect().width > 0;
                    const hasMatchEnded = finText.textContent.trim().length > 0;

                    if (isFinTextVisible && isOffBtnVisible && hasMatchEnded && !clicked.has(offBtn)) {
                        safeClick(offBtn, 50 + Math.floor(Math.random() * 100), "5. ODADAN ÇIK", () => {
                            console.log("[BOT] -> Döngü Sıfırlandı!");
                            clicked = new WeakSet();

                            // Toast temizliğini güvenli hale getirdik
                            const toastBody = document.querySelector('.toast-body.fw-bold.text-white');
                            if (toastBody) toastBody.innerHTML = '';
                        });
                        return;
                    }
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
        })


        let ShieldModeButton = document.createElement('button');
        ShieldModeButton.className = "quasar-utility-btn";
        ShieldModeButton.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L4.35009 13.3929C2.24773 11.8912 1 9.46667 1 6.88306V3L8 0L15 3V6.88306C15 9.46667 13.7523 11.8912 11.6499 13.3929L8 16ZM12.2071 5.70711L10.7929 4.29289L7 8.08579L5.20711 6.29289L3.79289 7.70711L7 10.9142L12.2071 5.70711Z" fill="#ff0000"></path></svg>`;
        if (window.quasarShieldMode) {
            ShieldModeButton.classList.add('active'); // Başlangıçta arayüzde aktif göster
        }
        ShieldModeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            window.quasarShieldMode = !window.quasarShieldMode;
            if (window.quasarShieldMode) {
                this.classList.add('active');
                applyQuasarShield();
                quasarLog("SHIELD_PROTECTION_ARMED");
            } else {
                this.classList.remove('active');
                quasarLog("SHIELD_DISABLED");
            }
        });
        ShieldModeButton.addEventListener('mousedown', (e) => e.stopPropagation());

        ControlsRow.append(LangSelect, HumanModeButton, QuasarAutomationButton, AutoModeButton, ShieldModeButton);
        QuasarPanel.appendChild(ControlsRow);

// --- ANA GÖVDE SARMALAYICI ---
        let MainBodyWrapper = document.createElement('div');
        MainBodyWrapper.style.cssText = `display: flex; flex-direction: column; gap: 14px; width: 100%;`;

        let HizKonteyner = document.createElement('div');
        HizKonteyner.style.cssText = `display: flex; flex-direction: column; gap: 4px;`;

        let HizLabel = document.createElement('div');
        HizLabel.id = 'quasar-freq-label';
        HizLabel.style.cssText = `color: #ff0000; font-size: 10px; font-weight: bold; letter-spacing: 1px;`;
        HizLabel.innerHTML = `<span>${quasarLanguages.TR.freq}</span>`;

        let HizSlider = document.createElement('input');
        HizSlider.id = 'quasar-range-input';
        HizSlider.type = 'range';
        HizSlider.min = '30';
        HizSlider.max = '500';
        HizSlider.step = '5';
        HizSlider.value = window.quasarBotWPM;

        let WpmDisplay = document.createElement('div');
        WpmDisplay.id = 'quasar-wpm-display';
        WpmDisplay.style.cssText = `font-size: 13px; color: #ff0000; font-weight: bold; letter-spacing: 1px; margin-top: 2px;`;
        WpmDisplay.innerHTML = `SPEED: <span>${window.quasarBotWPM} WPM</span>`;

        HizSlider.addEventListener('input', function() {
            window.quasarBotWPM = parseInt(this.value);
            document.getElementById('quasar-wpm-display').innerHTML = `SPEED: <span>${window.quasarBotWPM} WPM</span>`;
        });

        HizKonteyner.appendChild(HizLabel);
        HizKonteyner.appendChild(HizSlider);
        HizKonteyner.appendChild(WpmDisplay);

        let StatusText = document.createElement('div');
        StatusText.id = 'quasar-status-text';
        StatusText.textContent = quasarLanguages.TR.standby;
        StatusText.style.cssText = `font-size: 10px; color: #ff0000; letter-spacing: 1px; margin-top: 4px; margin-bottom: -4px; font-weight: bold;`;

        let QuasarBotButton = document.createElement('button');
        QuasarBotButton.id = 'quasar-bot-button';
        QuasarBotButton.textContent = quasarLanguages.TR.init_btn;
        QuasarBotButton.style.cssText = `
width: 100%; padding: 13px; font-family: 'Courier New', Courier, monospace;
font-size: 11px; font-weight: bold; letter-spacing: 1.5px;
background-color: transparent; color: #ff0000; border: 1px solid #ff0000;
cursor: pointer; text-transform: uppercase;
box-shadow: inset 0 0 6px rgba(255, 0, 0, 0.15); transition: all 0.2s ease;
`;

        function botButonunuSıfırla() {
            const l = quasarLanguages[window.quasarLang] || quasarLanguages.TR;
            QuasarBotButton.textContent = l.init_btn;
            QuasarBotButton.style.background = 'transparent';
            QuasarBotButton.style.color = '#ff0000';
            StatusText.textContent = l.standby;
        }

        QuasarBotButton.addEventListener('click', function (e) {
            e.stopPropagation();
            const l = quasarLanguages[window.quasarLang] || quasarLanguages.TR;
            if (!window.isQuasarBotRunning) {
                QuasarBotButton.textContent = l.term_btn;
                QuasarBotButton.style.background = '#ff0000';
                QuasarBotButton.style.color = '#000000';
                StatusText.textContent = l.injecting;
                window.QuasarTypeBot();
            } else {
                window.isQuasarBotRunning = false;
                quasarLog(l.term);
                botButonunuSıfırla();
            }
        });

        HizSlider.addEventListener('mousedown', (e) => e.stopPropagation());

        let ConsoleContainer = document.createElement('div');
        ConsoleContainer.style.cssText = `display: flex; flex-direction: column; gap: 5px; margin-top: 4px;`;

        let ConsoleLabel = document.createElement('div');
        ConsoleLabel.textContent = "CORE_LIVE_LOGS:";
        ConsoleLabel.style.cssText = `color: #ff0000; font-size: 9px; font-weight: bold; letter-spacing: 1px;`;

        let ConsoleBox = document.createElement('div');
        ConsoleBox.id = 'quasar-console-box';
        ConsoleBox.textContent = 'SYSTEM_READY';
        ConsoleBox.style.cssText = `
background: #000000; border: 1px solid #ff0000; padding: 8px 10px;
font-size: 11px; font-weight: bold; color: #ff3333;
text-shadow: 0 0 2px rgba(255, 0, 0, 0.4); overflow-x: auto; white-space: nowrap;
`;

        let QuasarClearCookiesButton = document.createElement('button');
        QuasarClearCookiesButton.id = 'quasar-clear-cookies-btn';
        QuasarClearCookiesButton.className = "quasar-utility-btn-v1";
        QuasarClearCookiesButton.innerHTML = `
        <svg width="20px" height="20px" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ff0000"> <style type="text/css"> .st0{fill:#ff0000;} </style> <path class="st0" d="M455.925,324.816v-0.305c-43.168,34.714-115.123,56.648-200,56.648c-74.15,0-138.432-16.743-182.279-44.12 c-6.223-3.94-12.07-8.112-17.48-12.524v0.178c-0.076-0.062-0.162-0.119-0.24-0.182v92.043c0,52.626,89.717,95.445,200,95.445 s200-42.819,200-95.445v-56.488l0.15-35.363C456.026,324.742,455.974,324.777,455.925,324.816z"></path> <path class="st0" d="M255.925,340.831c110.283,0,200-42.82,200-95.444v-5.188V201.87v-16.675l0.15-10.437 c-0.049,0.039-0.102,0.074-0.15,0.113v-0.301c-43.168,34.714-115.123,56.648-200,56.648c-74.117,0-138.375-16.73-182.221-44.087 c-6.244-3.952-12.111-8.137-17.539-12.562v0.182c-0.076-0.062-0.162-0.119-0.24-0.182v27.3v38.329v5.188 C55.925,298.012,145.642,340.831,255.925,340.831z"></path> <path class="st0" d="M255.925,190.89c110.283,0,200-42.819,200-95.444c0-1.507-0.328-2.974-0.472-4.463 c-0.836-8.539-3.844-16.81-9.098-24.622C420.507,27.918,344.952,0,255.925,0C166.898,0,91.343,27.918,65.497,66.36 c-5.256,7.812-8.264,16.083-9.098,24.622c-0.147,1.488-0.475,2.956-0.475,4.463C55.925,148.07,145.642,190.89,255.925,190.89z"></path></svg>
        `;
        QuasarClearCookiesButton.addEventListener('click', function(e) {
            e.stopPropagation();
            try {
                const QuasarCookies = document.cookie.split(";");
                for (let i = 0; i < QuasarCookies.length; i++) {
                    const QuasarCookie = QuasarCookies[i];
                    const QuasarEqPos = QuasarCookie.indexOf("=");
                    const QuasarCookieName = QuasarEqPos > -1 ? QuasarCookie.substr(0, QuasarEqPos).trim() : QuasarCookie.trim();

                    document.cookie = QuasarCookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                    document.cookie = QuasarCookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
                    document.cookie = QuasarCookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname.split('.').slice(-2).join('.');
                }
                quasarLog("QUASAR_COOKIES_CLEARED");
            } catch (err) {
                quasarLog("QUASAR_COOKIE_ERROR");
            }
        });
        QuasarClearCookiesButton.addEventListener('mousedown', (e) => e.stopPropagation());
        ControlsRow.appendChild(QuasarClearCookiesButton);
        ConsoleContainer.appendChild(ConsoleLabel);
        ConsoleContainer.appendChild(ConsoleBox);

        MainBodyWrapper.appendChild(HizKonteyner);
        MainBodyWrapper.appendChild(StatusText);
        MainBodyWrapper.appendChild(QuasarBotButton);
        MainBodyWrapper.appendChild(ConsoleContainer);
        QuasarPanel.appendChild(MainBodyWrapper);

// --- KÜÇÜLTME TETİKLEYİCİSİ ---
        let isMinimized = false;
        MinimizeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            isMinimized = !isMinimized;
            if (isMinimized) {
                MainBodyWrapper.style.display = 'none';
                ControlsRow.style.display = 'none';
                QuasarPanel.style.width = '210px';
                QuasarPanel.style.padding = '6px 10px';
                DragLabel.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z" fill="#ff0000"></path></svg> ${quasarLanguages.TR.title}` ;
                MinimizeButton.innerHTML = "[+]";
            } else {
                MainBodyWrapper.style.display = 'flex';
                ControlsRow.style.display = 'flex';
                QuasarPanel.style.width = '320px';
                QuasarPanel.style.padding = '16px';
                MinimizeButton.innerHTML = "[-]";
                updatePanelLanguage();
            }
        });
        MinimizeButton.addEventListener('mousedown', (e) => e.stopPropagation());


        let policy;
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
            try {
                policy = window.trustedTypes.createPolicy('default', {
                    createHTML: (string) => string
                });
            } catch (e) {
                policy = window.trustedTypes.policyFromHTML || { createHTML: (s) => s };
            }
        } else {
            policy = { createHTML: (s) => s };
        }

        let isDragging = false;
        let startX, startY;
        let offsetX, offsetY;

        QuasarPanel.addEventListener('mousedown', function(e) {
            if (e.target !== QuasarBotButton &&
                e.target !== HizSlider &&
                !e.target.classList.contains('quasar-utility-btn') &&
                e.target !== LangSelect &&
                e.target !== ControlsRow) {

                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                offsetX = e.clientX - QuasarPanel.getBoundingClientRect().left;
                offsetY = e.clientY - QuasarPanel.getBoundingClientRect().top;
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;

            const deltaX = Math.abs(e.clientX - startX);
            const deltaY = Math.abs(e.clientY - startY);

            if (deltaX > 5 || deltaY > 5) {
                QuasarPanel.style.bottom = 'auto';
                QuasarPanel.style.right = 'auto';

                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;

                x = Math.max(0, Math.min(x, window.innerWidth - QuasarPanel.offsetWidth));
                y = Math.max(0, Math.min(y, window.innerHeight - QuasarPanel.offsetHeight));

                QuasarPanel.style.left = x + 'px';
                QuasarPanel.style.top = y + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        function setPanelContent(element, htmlString) {
            element.innerHTML = policy ? policy.createHTML(htmlString) : htmlString;
        }

        document.body.append(QuasarPanel);

        const leftEye = document.querySelector('.q-left_eye');
        const rightEye = document.querySelector('.q-right_eye');

        document.addEventListener('mousemove', e => {
            // Her göz için merkez koordinatları
            const eyes = [
                {el: leftEye, cx: 9, cy: 16},
                {el: rightEye, cx: 15, cy: 16}
            ];

            eyes.forEach(eye => {
                const svgRect = eye.el.ownerSVGElement.getBoundingClientRect();
                const eyeCenterX = svgRect.left + (eye.cx / 24) * svgRect.width;
                const eyeCenterY = svgRect.top + (eye.cy / 24) * svgRect.height;

                const dx = e.clientX - eyeCenterX;
                const dy = e.clientY - eyeCenterY;

                const maxDistance = 1; // gözbebeği max hareket
                const distance = Math.min(maxDistance, Math.hypot(dx, dy));
                const angle = Math.atan2(dy, dx);

                const px = distance * Math.cos(angle);
                const py = distance * Math.sin(angle);

                eye.el.setAttribute('transform', `translate(${px}, ${py})`);
            });
        });

// --- Quasar HOOK BAŞLANGIÇ TETİKLEYİCİSİ ---
        applyQuasarShield();

    })();