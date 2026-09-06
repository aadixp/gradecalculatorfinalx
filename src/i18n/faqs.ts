import type { Lang } from './ui';

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: Record<Lang, FaqItem[]> = {
  en: [
    {
      question: "What is a grade calculator and how does it work?",
      answer: "A grade calculator is an academic tool that calculates your current course percentage, weighted averages, letter grades, and GPA. It multiplies your scores by their syllabus weights (e.g., homework 20%, midterms 30%, final 50%) to give an accurate, real-time reflection of your academic standing."
    },
    {
      question: "How do I calculate my current grade in a class?",
      answer: "To calculate your current grade, multiply each earned assignment or exam percentage by its category weight, add those weighted scores together, and divide by the total graded weight completed so far. If you've completed 60% of the syllabus, our calculator automatically normalizes your grade to 100%."
    },
    {
      question: "How does a weighted grade calculator work?",
      answer: "A weighted grade calculator applies the mathematical formula: Weighted Grade = Σ(Score × Weight) ÷ Σ(Weight). When assignments carry different syllabus percentages (such as exams counting more than quizzes), this formula gives each score its proper proportional value."
    },
    {
      question: "How do I calculate what grade I need on my final exam?",
      answer: "Use the final exam target formula: Required Final Score = (Desired Course Grade - Current Grade × (1 - Final Exam Weight)) ÷ Final Exam Weight. Our Final Exam Calculator calculates the exact percentage you need for an A, B, C, or passing score."
    },
    {
      question: "How can I calculate what my grade will be after an upcoming test?",
      answer: "Input your current course percentage, enter the weight of the upcoming test, and test different hypothetical scores. The calculator combines your existing marks with the test's weight to show your projected new course grade immediately."
    },
    {
      question: "How does the What-If grade simulator work?",
      answer: "The What-If simulator lets you adjust interactive sliders to model future assignment or exam scores. It shows you the best-case, worst-case, and expected outcomes on your final letter grade before you sit for an exam."
    },
    {
      question: "How much can one exam change my overall course grade?",
      answer: "The impact of any exam depends strictly on its syllabus weight. The formula for maximum grade change is: Grade Change = (Exam Score - Current Grade) × (Exam Weight ÷ Total Graded Weight). A heavily weighted final exam (e.g., 30–40%) will cause a much larger swing than a 5% quiz."
    },
    {
      question: "How is college GPA calculated on a 4.0 scale?",
      answer: "College GPA is calculated by multiplying each course's credit hours by the grade point value of the letter grade earned (e.g., A = 4.0, B = 3.0, C = 2.0), summing these quality points, and dividing by the total credit hours attempted."
    },
    {
      question: "How is cumulative GPA calculated across multiple semesters?",
      answer: "Cumulative GPA is a credit-weighted aggregate: Cumulative GPA = Total Quality Points Across All Semesters ÷ Total Cumulative Credit Hours. Higher-credit semesters contribute proportionally more to your overall graduation GPA."
    },
    {
      question: "How is Indian CGPA calculated on a 10-point scale?",
      answer: "Under UGC and AICTE Choice Based Credit System (CBCS) guidelines, Indian CGPA is calculated as: CGPA = Σ(Grade Points × Course Credits) ÷ Σ(Course Credits), where letter grades range from O (10 points) down to F (0 points)."
    },
    {
      question: "What is the difference between SGPA and CGPA?",
      answer: "SGPA (Semester Grade Point Average) measures your academic performance in a single semester, while CGPA (Cumulative Grade Point Average) is the credit-weighted average of all completed semesters throughout your degree program."
    },
    {
      question: "How do I convert a 10-point CGPA to a percentage?",
      answer: "Under standard AICTE and CBSE guidelines, percentage is calculated as: Percentage (%) = CGPA × 9.5. However, specific universities (such as Mumbai University or VTU) use tailored institutional formulas. Our CGPA to Percentage Calculator supports all major university formulas."
    },
    {
      question: "How does the Target GPA and Target CGPA planner work?",
      answer: "The Target GPA/CGPA planner uses your current academic standing, completed credit hours, and target graduation grade to calculate the exact average GPA or SGPA you must maintain across your remaining credit hours."
    },
    {
      question: "How does the drop-lowest-score feature work in weighted grading?",
      answer: "When your instructor drops the lowest quiz or assignment, the calculator automatically identifies the lowest percentage score within that category, removes it from calculations, and recalculates your average using the remaining assignments."
    }
  ],
  es: [
    {
      question: "¿Qué es una calculadora de calificaciones y cómo funciona?",
      answer: "Una calculadora de calificaciones es una herramienta académica que calcula tu porcentaje actual, promedios ponderados, letras de calificación y GPA. Multiplica tus notas por sus pesos del programa (ej. tareas 20%, parciales 30%, examen 50%) para mostrar tu rendimiento real."
    },
    {
      question: "¿Cómo calculo mi calificación actual en un curso?",
      answer: "Multiplica el porcentaje obtenido en cada tarea o examen por su ponderación, suma estos puntajes ponderados y divide entre el peso total evaluado hasta el momento. Si has completado el 60% del curso, la calculadora normaliza automáticamente tu nota al 100%."
    },
    {
      question: "¿Cómo funciona una calculadora de notas ponderadas?",
      answer: "Aplica la fórmula matemática: Nota Ponderada = Σ(Nota × Peso) ÷ Σ(Peso). Cuando las evaluaciones tienen diferentes porcentajes (como un examen final que vale más que una tarea), esta fórmula otorga a cada nota su peso proporcional correcto."
    },
    {
      question: "¿Cómo calculo la nota que necesito en mi examen final?",
      answer: "Usa la fórmula: Nota Requerida = (Nota Deseada - Nota Actual × (1 - Peso Examen Final)) ÷ Peso Examen Final. Nuestra calculadora de examen final determina la nota exacta necesaria para obtener A, B, C o aprobar la materia."
    },
    {
      question: "¿Cómo saber cuál será mi calificación después de un examen próximo?",
      answer: "Ingresa tu porcentaje actual, el peso del próximo examen y diferentes notas hipotéticas. La calculadora integrará de inmediato tu nota prevista para mostrarte tu nuevo promedio proyectado."
    },
    {
      question: "¿Cómo funciona el simulador de notas hipotéticas (What-If)?",
      answer: "El simulador What-If te permite mover controles interactivos para probar calificaciones futuras. Te muestra los escenarios óptimos, medios y mínimos en tu promedio final antes de rendir la prueba."
    },
    {
      question: "¿Cuánto puede cambiar un solo examen mi promedio general?",
      answer: "El impacto depende directamente del porcentaje del examen en el programa. La fórmula de cambio es: Variación = (Nota Examen - Nota Actual) × (Peso Examen ÷ Peso Total Evaluado). Un examen final de 30–40% provocará un cambio mucho mayor que una prueba de 5%."
    },
    {
      question: "¿Cómo se calcula el GPA universitario en escala de 4.0?",
      answer: "El GPA universitario se calcula multiplicando los créditos de cada asignatura por los puntos de la calificación obtenida (ej. A = 4.0, B = 3.0, C = 2.0), sumando estos puntos de calidad y dividiendo entre los créditos totales cursados."
    },
    {
      question: "¿Cómo se calcula el GPA acumulado de varios semestres?",
      answer: "El GPA acumulado es un promedio ponderado por créditos: GPA Acumulado = Puntos de Calidad Totales ÷ Créditos Totales Acumulados. Los semestres con mayor carga de créditos influyen proporcionalmente más en tu promedio de graduación."
    },
    {
      question: "¿Cómo se calcula el CGPA en la escala de 10 puntos de India?",
      answer: "Bajo los lineamientos CBCS de UGC y AICTE, el CGPA se calcula como: CGPA = Σ(Puntos de Calificación × Créditos) ÷ Σ(Créditos), donde las calificaciones van desde O (10 puntos) hasta F (0 puntos)."
    },
    {
      question: "¿Cuál es la diferencia entre SGPA y CGPA?",
      answer: "El SGPA mide el rendimiento académico en un solo semestre, mientras que el CGPA representa el promedio ponderado por créditos de todos los semestres cursados a lo largo de la carrera."
    },
    {
      question: "¿Cómo convierto un CGPA de 10 puntos a porcentaje?",
      answer: "Según AICTE y CBSE, la fórmula estándar es: Porcentaje (%) = CGPA × 9.5. Sin embargo, ciertas universidades utilizan fórmulas propias. Nuestra herramienta incluye las fórmulas de las principales universidades."
    },
    {
      question: "¿Cómo funciona el planificador de meta de GPA y CGPA?",
      answer: "Utiliza tu promedio actual, créditos completados y tu meta de graduación para calcular el GPA o SGPA exacto que debes promediar en los créditos restantes."
    },
    {
      question: "¿Cómo funciona la opción de descartar la nota más baja?",
      answer: "Cuando tu profesor descarta la peor calificación, la calculadora identifica automáticamente la nota más baja de esa categoría, la excluye y recalcula tu promedio con los puntajes restantes."
    }
  ],
  ja: [
    {
      question: "成績計算ツールとは何ですか？どのように機能しますか？",
      answer: "成績計算ツールは、授業の総合得点率、配点加重平均、レターグレード（A/B/C）、GPAを算出する学習支援ツールです。各課題や試験の得点にシラバスの配点割合（例: 宿題20%、中間30%、期末50%）を掛け合わせ、現在の正確な成績をリアルタイムに提示します。"
    },
    {
      question: "現在の授業の成績はどのように計算しますか？",
      answer: "採点済みの各課題の得点率にその配点割合を掛け、それらを合計した値を、現在までに採点された合計配点で割ることで算出します。学期途中で配点の60%しか採点されていない場合でも、本ツールが自動的に100%基準へ正規化します。"
    },
    {
      question: "配点加重平均（Weighted Grade）の計算方法は？",
      answer: "加重平均の計算式「総合点 = Σ(得点 × 配点) ÷ Σ(配点)」を適用します。期末試験が小テストよりも重視される場合など、シラバスの配点割合に応じた正しい比例評価が行われます。"
    },
    {
      question: "期末試験で必要な得点を計算する方法は？",
      answer: "期末目標計算式「必要得点 = (目標成績 - 現在の成績 × (1 - 期末配点)) ÷ 期末配点」を使用します。A、B、Cなどの目標グレード獲得に必要な最低得点を即座に判定します。"
    },
    {
      question: "次のテスト後の成績を事前に予測するには？",
      answer: "現在の成績と次回テストの配点割合を入力し、予想される得点をテスト入力することで、テスト後の新しい総合成績を即座にシミュレーションできます。"
    },
    {
      question: "仮得点シミュレータ（What-If）はどのように機能しますか？",
      answer: "What-Ifシミュレータでは、スライダーを動かして今後の課題や試験の予想スコアを自由に変更できます。本番の試験前に、最良・最悪・期待値の各シナリオで最終成績がどう変動するかを確認できます。"
    },
    {
      question: "1回のテストで総合成績はどれくらい変動しますか？",
      answer: "変動幅は試験の配点割合に依存します。変動計算式: 変動幅 = (試験得点 - 現在成績) × (試験配点 ÷ 採点済み合計配点)。配点30〜40%の期末試験は、5%の小テストに比べて総合成績を大きく左右します。"
    },
    {
      question: "4.0満点スケールの大学GPAはどのように計算されますか？",
      answer: "各科目の単位数に獲得したグレードポイント（A=4.0、B=3.0、C=2.0など）を掛け合わせ、合計クオリティポイントを総登録単位数で割ることで算出されます。"
    },
    {
      question: "複数学期にまたがる通算累計GPA（Cumulative GPA）の計算方法は？",
      answer: "通算累計GPA = 全学期のクオリティポイント総和 ÷ 全学期の総登録単位数 の加重平均で算出されます。単位数が多い学期ほど、卒業時の最終GPAに大きな影響を与えます。"
    },
    {
      question: "インドの10点満点CGPA（UGC基準）はどのように計算されますか？",
      answer: "UGCおよびAICTEのCBCSガイドラインに基づき、「CGPA = Σ(グレードポイント × 科目単位数) ÷ Σ(科目単位数)」で算出されます。評価はO（10点）からF（0点）まで設定されています。"
    },
    {
      question: "SGPAとCGPAの違いは何ですか？",
      answer: "SGPA（Semester Grade Point Average）は単一学期の学業成績を示し、CGPA（Cumulative Grade Point Average）は学位課程で修得した全学期の単位加重平均を表します。"
    },
    {
      question: "10点満点CGPAをパーセンテージに換算する方法は？",
      answer: "AICTEおよびCBSEの標準基準では「換算パーセント = CGPA × 9.5」で計算されます。特定大学（ムンバイ大学やVTU等）の独自計算式にも本ツールの換算機能は対応しています。"
    },
    {
      question: "目標GPA / CGPAプランナーはどのように機能しますか？",
      answer: "現在のGPA、修得済み単位数、卒業目標GPAを入力することで、残りの履修単位で平均してどのGPA/SGPAを維持する必要があるかを逆算します。"
    },
    {
      question: "最低点除外（Drop Lowest）機能はどのように機能しますか？",
      answer: "シラバスの最低点除外ルールに基づき、同カテゴリー内で最も低かったスコアを自動検知して除外し、残りの課題スコアで正確な平均点を再計算します。"
    }
  ],
  fr: [
    {
      question: "Qu'est-ce qu'une calculatrice de notes et comment fonctionne-t-elle ?",
      answer: "Une calculatrice de notes calcule votre moyenne actuelle, vos moyennes pondérées par coefficient, vos mentions et votre GPA. Elle applique les coefficients du programme (ex. devoirs 20%, partiels 30%, examen final 50%) pour refléter fidèlement votre niveau académique."
    },
    {
      question: "Comment calculer ma moyenne actuelle dans une matière ?",
      answer: "Multipliez chaque note obtenue par son coefficient, faites la somme de ces points pondérés et divisez par la somme des coefficients déjà évalués. Si seuls 60% des devoirs sont notés, la calculatrice normalise automatiquement votre note sur 100%."
    },
    {
      question: "Comment fonctionne une calculatrice de moyenne pondérée ?",
      answer: "Elle applique la formule mathématique : Moyenne Pondérée = Σ(Note × Coefficient) ÷ Σ(Coefficients). Lorsque les devoirs ont des importances différentes, cette formule attribue à chaque note sa valeur proportionnelle exacte."
    },
    {
      question: "Comment calculer la note nécessaire à l'examen final ?",
      answer: "Utilisez la formule : Note Requise = (Moyenne Visée - Moyenne Actuelle × (1 - Poids Examen)) ÷ Poids Examen. Notre calculatrice d'examen final détermine la note exacte requise pour obtenir un A, B, C ou valider votre cours."
    },
    {
      question: "Comment savoir quelle sera ma moyenne après un prochain contrôle ?",
      answer: "Indiquez votre moyenne actuelle, le coefficient du prochain contrôle et testez différentes notes estimées. La calculatrice combine instantanément ces données pour projeter votre nouvelle moyenne."
    },
    {
      question: "Comment fonctionne le simulateur de notes hypothétiques (What-If) ?",
      answer: "Le simulateur What-If vous permet de manipuler des curseurs pour tester vos notes futures. Il vous présente les scénarios optimistes, moyens et prudents sur votre note finale avant l'examen."
    },
    {
      question: "Quel impact un seul examen peut-il avoir sur ma moyenne globale ?",
      answer: "L'impact dépend directement du coefficient de l'examen. Formule : Variation = (Note Examen - Moyenne Actuelle) × (Poids Examen ÷ Poids Évalué). Un examen final valant 30 à 40% provoquera une variation bien plus importante qu'un devoir à 5%."
    },
    {
      question: "Comment le GPA universitaire sur 4.0 est-il calculé ?",
      answer: "Le GPA universitaire se calcule en multipliant les crédits de chaque cours par la valeur de la lettre obtenue (A=4.0, B=3.0, C=2.0), en additionnant ces points et en divisant par le nombre total de crédits tentés."
    },
    {
      question: "Comment calcule-t-on le GPA cumulé sur plusieurs semestres ?",
      answer: "Le GPA cumulé est une moyenne pondérée par les crédits : GPA Cumulé = Total des Points Qualité ÷ Total des Crédits Cumulés. Les semestres comportant davantage de crédits influencent plus fortement le GPA final."
    },
    {
      question: "Comment est calculé le CGPA indien sur 10 points (UGC) ?",
      answer: "Selon le système CBCS de l'UGC et de l'AICTE, le CGPA est calculé ainsi : CGPA = Σ(Points de Note × Crédits) ÷ Σ(Crédits), les notes allant de O (10 points) à F (0 point)."
    },
    {
      question: "Quelle est la différence entre le SGPA et le CGPA ?",
      answer: "Le SGPA mesure vos résultats sur un seul semestre, tandis que le CGPA représente la moyenne pondérée par crédits de l'ensemble des semestres de votre cursus."
    },
    {
      question: "Comment convertir un CGPA sur 10 points en pourcentage ?",
      answer: "Selon l'AICTE et le CBSE, la formule standard est : Pourcentage (%) = CGPA × 9.5. Certaines universités utilisent des formules spécifiques également prises en charge par notre convertisseur."
    },
    {
      question: "Comment fonctionne le planificateur d'objectif de GPA / CGPA ?",
      answer: "En renseignant votre moyenne actuelle, vos crédits validés et votre objectif de diplôme, il calcule la moyenne exacte que vous devez maintenir sur vos crédits restants."
    },
    {
      question: "Comment fonctionne l'option d'exclusion de la note la plus basse ?",
      answer: "Lorsque votre professeur élimine la pire note d'une série de devoirs, la calculatrice identifie automatiquement la note la plus faible, l'exclut et recalcule la moyenne sur les notes restantes."
    }
  ],
  de: [
    {
      question: "Was ist ein Notenrechner und wie funktioniert er?",
      answer: "Ein Notenrechner ist ein akademisches Tool zur Berechnung Ihres aktuellen Notendurchschnitts, gewichteter Durchschnittswerte, Buchstabenskalen und des GPA. Er multipliziert Ihre Noten mit den Gewichtungen Ihres Lehrplans (z. B. Hausaufgaben 20%, Klausuren 30%, Abschlussprüfung 50%)."
    },
    {
      question: "Wie berechne ich meine aktuelle Note in einem Kurs?",
      answer: "Multiplizieren Sie jede erzielte Note mit ihrer prozentualen Gewichtung, addieren Sie diese Werte und teilen Sie durch die Summe der bisher bewerteten Gewichtungen. Bei unvollständigem Semesterstand normalisiert unser Rechner die Note automatisch auf 100%."
    },
    {
      question: "Wie funktioniert ein gewichteter Notenrechner?",
      answer: "Er nutzt die mathematische Formel: Gewichtete Note = Σ(Note × Gewicht) ÷ Σ(Gewicht). Haben Prüfungen ein höheres Gewicht als kleine Hausarbeiten, sorgt diese Formel für die exakte proportionale Wertung jeder Leistung."
    },
    {
      question: "Wie berechne ich die benötigte Note in der Abschlussprüfung?",
      answer: "Nutzen Sie die Formel: Benötigte Prüfungsnote = (Zielnote - Aktuelle Note × (1 - Prüfungsgewicht)) ÷ Prüfungsgewicht. Unser Abschlussnotenrechner zeigt Ihnen sofort die erforderliche Mindestpunktzahl für Ihre Wunschnote."
    },
    {
      question: "Wie berechne ich meine Gesamtnote nach einer anstehenden Prüfung?",
      answer: "Geben Sie Ihre aktuelle Note, das Gewicht der bevorstehenden Prüfung und geschätzte Testnoten ein. Der Rechner ermittelt unverzüglich Ihre voraussichtliche neue Gesamtnote."
    },
    {
      question: "Wie funktioniert der Was-wäre-wenn-Notensimulator (What-If)?",
      answer: "Mit dem What-If-Simulator können Sie über interaktive Schieberegler verschiedene Prüfungsszenarien durchspielen, um Best-Case- und Worst-Case-Auswirkungen auf Ihre Endnote vorab zu analysieren."
    },
    {
      question: "Wie stark kann eine einzelne Klausur meine Gesamtnote verändern?",
      answer: "Der Einfluss hängt von der Gewichtung im Lehrplan ab. Berechnungsformel: Notenveränderung = (Klausurnote - Aktuelle Note) × (Klausurgewicht ÷ Bewertetes Gesamtgewicht). Eine Abschlussklausur mit 30–40% Gewichtung bewegt den Schnitt viel stärker als ein 5%-Test."
    },
    {
      question: "Wie wird der College-GPA auf einer 4.0-Skala berechnet?",
      answer: "Der GPA wird berechnet, indem die Leistungspunkte (Credit Hours) jedes Kurses mit den Notenpunkten (z. B. A = 4.0, B = 3.0, C = 2.0) multipliziert werden, die Summe gebildet und durch die Gesamtanzahl der Credits geteilt wird."
    },
    {
      question: "Wie wird der kumulierte GPA über mehrere Semester berechnet?",
      answer: "Der kumulierte GPA ist ein gewichteter Gesamtdurchschnitt: Kumulierter GPA = Gesamt-Qualitätspunkte ÷ Gesamt-Credits aller Semester. Semester mit höherer Credit-Zahl beeinflussen die Abschlussnote stärker."
    },
    {
      question: "Wie wird der indische CGPA auf der 10-Punkte-Skala berechnet?",
      answer: "Gemäß den UGC/AICTE-CBCS-Richtlinien lautet die Formel: CGPA = Σ(Notenpunkte × Credits) ÷ Σ(Credits), wobei die Noten von O (10 Punkte) bis F (0 Punkte) reichen."
    },
    {
      question: "Was ist der Unterschied zwischen SGPA und CGPA?",
      answer: "Der SGPA erfasst die Studienleistung eines einzelnen Semesters, während der CGPA den credit-gewichteten Gesamtdurchschnitt aller bisher absolvierten Semester Ihres Studiums abbildet."
    },
    {
      question: "Wie rechne ich einen 10-Punkte-CGPA in Prozent um?",
      answer: "Nach den Standardrichtlinien von AICTE und CBSE gilt: Prozent (%) = CGPA × 9,5. Unser Rechner unterstützt zudem universitätsspezifische Formeln (z. B. Mumbai University oder VTU)."
    },
    {
      question: "Wie funktioniert der Ziel-GPA- und Ziel-CGPA-Planer?",
      answer: "Er vergleicht Ihren aktuellen Schnitt und Ihre absolvierten Credits mit Ihrer Abschluss-Wunschnote und ermittelt den genauen Notendurchschnitt, den Sie in den verbleibenden Kursen erzielen müssen."
    },
    {
      question: "Wie funktioniert die Funktion zum Streichen der schlechtesten Note?",
      answer: "Erlaubt Ihre Prüfungsordnung das Streichen der schwächsten Einzelleistung, erkennt der Rechner diese automatisch, schließt sie aus und berechnet den Schnitt mit den verbleibenden Noten neu."
    }
  ],
  pt: [
    {
      question: "O que é uma calculadora de notas e como ela funciona?",
      answer: "Uma calculadora de notas calcula sua porcentagem atual, médias ponderadas, notas finais e GPA. Ela multiplica suas pontuações pelos pesos da ementa (ex.: trabalhos 20%, provas parciais 30%, exame final 50%) para exibir seu desempenho acadêmico em tempo real."
    },
    {
      question: "Como calcular minha nota atual em uma disciplina?",
      answer: "Multiplique cada nota obtida pelo peso correspondente, some esses pontos ponderados e divida pelo total de pesos já avaliados. Se apenas 60% do curso foi concluído, a calculadora normaliza sua nota automaticamente para a escala de 100%."
    },
    {
      question: "Como funciona a calculadora de média ponderada?",
      answer: "Aplica a fórmula: Média Ponderada = Σ(Nota × Peso) ÷ Σ(Pesos). Quando as avaliações têm importâncias distintas (como provas com maior peso que tarefas diárias), essa fórmula garante a proporção exata de cada avaliação."
    },
    {
      question: "Como calcular a nota necessária no exame final?",
      answer: "Utilize a fórmula: Nota Necessária = (Nota Alvo - Nota Atual × (1 - Peso Exame Final)) ÷ Peso Exame Final. Nossa calculadora determina a nota exata para obter A, B, C ou atingir a média de aprovação."
    },
    {
      question: "Como prever minha nota final após uma próxima prova?",
      answer: "Insira sua porcentagem atual, o peso da prova e diferentes notas estimadas. A calculadora combinará os dados de imediato para mostrar sua nova média projetada."
    },
    {
      question: "Como funciona o simulador de notas hipotéticas (What-If)?",
      answer: "O simulador What-If permite ajustar controles interativos para testar notas futuras, exibindo os cenários mais favoráveis e desfavoráveis para sua média final antes do exame."
    },
    {
      question: "Quanto uma única prova pode alterar minha média geral?",
      answer: "O impacto depende do peso da avaliação no programa. Fórmula: Variação = (Nota da Prova - Nota Atual) × (Peso da Prova ÷ Peso Total Avaliado). Uma prova com peso de 30–40% causará um impacto muito maior do que um teste de 5%."
    },
    {
      question: "Como o GPA universitário na escala 4.0 é calculado?",
      answer: "O GPA é calculado multiplicando as horas de crédito de cada matéria pelos pontos da nota obtida (A = 4.0, B = 3.0, C = 2.0), somando esses pontos de qualidade e dividindo pelos créditos totais cursados."
    },
    {
      question: "Como calcular o GPA acumulado de múltiplos semestres?",
      answer: "O GPA acumulado é uma média ponderada por créditos: GPA Acumulado = Total de Pontos de Qualidade ÷ Total de Créditos Acumulados. Semestres com mais créditos exercem maior peso na nota final de formatura."
    },
    {
      question: "Como é calculado o CGPA indiano na escala de 10 pontos?",
      answer: "Sob as diretrizes CBCS da UGC e AICTE, calcula-se como: CGPA = Σ(Pontos da Nota × Créditos) ÷ Σ(Créditos), variando de O (10 pontos) a F (0 pontos)."
    },
    {
      question: "Qual é a diferença entre SGPA e CGPA?",
      answer: "O SGPA reflete o rendimento acadêmico de um único semestre, enquanto o CGPA representa a média ponderada por créditos de todos os semestres concluídos no curso."
    },
    {
      question: "Como converter CGPA de 10 pontos em porcentagem?",
      answer: "Pelas normas padrão da AICTE e CBSE: Porcentagem (%) = CGPA × 9.5. Nossa calculadora também suporta fórmulas institucionais específicas de diversas universidades."
    },
    {
      question: "Como funciona o planejador de meta de GPA / CGPA?",
      answer: "Com base no seu GPA atual, créditos concluídos e meta de graduação, ele calcula exatamente qual média de GPA ou SGPA você precisa manter nos créditos restantes."
    },
    {
      question: "Como funciona o recurso de desconsiderar a menor nota?",
      answer: "Quando a disciplina prevê o descarte da pior nota, a calculadora identifica automaticamente a nota mais baixa da categoria, exclui-a e recalcula sua média com as notas restantes."
    }
  ],
  ko: [
    {
      question: "성적 계산기란 무엇이며 어떻게 작동하나요?",
      answer: "성적 계산기는 현재 과목 백분율, 가중 평균, 문자 등급(A/B/C), GPA를 산출하는 학업 도구입니다. 과제, 중간고사, 기말고사의 실점수에 강의계획서의 가중치(예: 과제 20%, 중간 30%, 기말 50%)를 곱하여 정확한 현재 성적을 실시간으로 계산합니다."
    },
    {
      question: "현재 과목 성적은 어떻게 계산하나요?",
      answer: "채점 완료된 각 평가의 득점률에 가중치를 곱하고, 이 가중 점수들의 합을 현재까지 채점된 총 가중치로 나누어 계산합니다. 학기 중반에 전체의 60%만 채점된 상태라도 100% 기준으로 자동 보정됩니다."
    },
    {
      question: "가중 평균(Weighted Grade) 성적 계산기는 어떻게 작동하나요?",
      answer: "가중 평균 계산 공식 '가중 성적 = Σ(점수 × 가중치) ÷ Σ(가중치)'를 적용합니다. 기말고사가 퀴즈보다 배점이 높은 경우, 각 평가 항목의 비중에 맞게 정확한 성적이 계산됩니다."
    },
    {
      question: "기말고사에서 몇 점을 받아야 하는지 어떻게 계산하나요?",
      answer: "기말 목표 공식 '필요 시험 점수 = (목표 성적 - 현재 성적 × (1 - 기말 가중치)) ÷ 기말 가중치'를 사용합니다. 목표 등급(A, B, C 등)을 받기 위해 필요한 최소 기말고사 점수를 즉시 계산해 줍니다."
    },
    {
      question: "앞으로 볼 시험 후의 성적을 미리 계산할 수 있나요?",
      answer: "현재 성적과 예정된 시험의 가중치를 입력하고 예상 점수를 변경해 보면, 시험 후 예상되는 최종 과목 성적을 즉시 확인할 수 있습니다."
    },
    {
      question: "가상 점수 시뮬레이터(What-If)는 어떻게 작동하나요?",
      answer: "What-If 시뮬레이터는 슬라이더를 조절하여 앞으로의 과제나 시험 점수를 가상으로 대입해 볼 수 있는 기능입니다. 시험 전 최상의 시나리오와 최저 점수 시나리오를 미리 검토할 수 있습니다."
    },
    {
      question: "시험 한 번이 전체 성적에 얼마나 큰 영향을 미치나요?",
      answer: "영향력은 해당 시험의 가중치에 정비례합니다. 변동 공식: 성적 변동 = (시험 점수 - 현재 성적) × (시험 가중치 ÷ 채점 완료 가중치). 배점 30~40%인 기말고사는 5% 퀴즈보다 총점에 훨씬 큰 영향을 줍니다."
    },
    {
      question: "4.0 만점 기준 대학 GPA는 어떻게 계산되나요?",
      answer: "각 과목의 이수 학점과 취득 등급의 평점(A=4.0, B=3.0, C=2.0 등)을 곱한 평점 합계를 총 이수 학점으로 나누어 계산합니다."
    },
    {
      question: "여러 학기의 누적 GPA(Cumulative GPA)는 어떻게 계산하나요?",
      answer: "누적 GPA는 학점 가중 평균입니다: 누적 GPA = 전체 학기 평점 합계 ÷ 전체 이수 학점 총합. 이수 학점이 많은 학기일수록 졸업 평점에 더 큰 영향을 미칩니다."
    },
    {
      question: "인도 10점 만점 CGPA(UGC 기준)는 어떻게 계산하나요?",
      answer: "UGC 및 AICTE CBCS 기준에 따라 'CGPA = Σ(등급 평점 × 과목 학점) ÷ Σ(과목 학점)'으로 계산되며 등급은 O(10점)부터 F(0점)까지 부여됩니다."
    },
    {
      question: "SGPA와 CGPA의 차이점은 무엇인가요?",
      answer: "SGPA는 단일 학기의 학업 성적을 나타내며, CGPA는 학위 과정 전체에서 이수한 모든 학기의 학점 가중 누적 평점을 의미합니다."
    },
    {
      question: "10점 만점 CGPA를 백분율(%)로 변환하는 공식은?",
      answer: "AICTE 및 CBSE 표준 규정에 따라 '백분율(%) = CGPA × 9.5'로 계산됩니다. 본 계산기는 인도 주요 대학의 개별 변환 공식도 함께 지원합니다."
    },
    {
      question: "목표 GPA / CGPA 플래너는 어떻게 활용하나요?",
      answer: "현재 평점, 이수 학점, 졸업 목표 평점을 입력하면 남은 학점 동안 평균 몇 점의 GPA 또는 SGPA를 유지해야 하는지 정확히 계산해 줍니다."
    },
    {
      question: "최저 점수 제외(Drop Lowest) 기능은 어떻게 작동하나요?",
      answer: "강의계획서에 최저 점수 1회 제외 규정이 있는 경우, 해당 항목에서 가장 낮은 점수를 자동으로 감지하여 제외한 후 나머지 점수로 평균을 재계산합니다."
    }
  ],
  it: [
    {
      question: "Cos'è un calcolatore di voti e come funziona?",
      answer: "Un calcolatore di voti calcola la tua percentuale attuale, le medie ponderate, le lettere di valutazione e il GPA. Moltiplica i tuoi voti per i relativi pesi stabiliti dal programma (es. compiti 20%, esami intermedi 30%, esame finale 50%) per mostrare il tuo rendimento in tempo reale."
    },
    {
      question: "Come si calcola il voto attuale in un corso?",
      answer: "Moltiplica ciascun voto per il relativo coefficiente di peso, somma i punteggi ponderati e dividi per la somma dei pesi già valutati. Se è stato completato solo il 60% del corso, il calcolatore normalizza automaticamente il voto al 100%."
    },
    {
      question: "Come funziona un calcolatore di media ponderata?",
      answer: "Applica la formula matematica: Media Ponderata = Σ(Voto × Peso) ÷ Σ(Pesi). Quando le prove hanno importanza differente (come un esame finale che conta più di un test breve), questa formula attribuisce a ciascun voto il suo valore proporzionale."
    },
    {
      question: "Come calcolare il voto necessario all'esame finale?",
      answer: "Usa la formula: Voto Richiesto = (Voto Obiettivo - Voto Attuale × (1 - Peso Esame Finale)) ÷ Peso Esame Finale. Il nostro calcolatore determina il punteggio esatto necessario per ottenere un voto eccellente o superare la materia."
    },
    {
      question: "Come calcolare la media finale dopo un prossimo esame?",
      answer: "Inserisci la tua media attuale, il peso della prova e diversi punteggi stimati. Il calcolatore integrerà i dati per mostrarti all'istante la nuova media prevista."
    },
    {
      question: "Come funziona il simulatore di voti ipotetici (What-If)?",
      answer: "Il simulatore What-If ti consente di spostare cursori interattivi per testare i voti futuri, mostrandoti gli scenari migliori e peggiori sulla tua media finale prima di sostenere la prova."
    },
    {
      question: "Quanto può incidere un singolo esame sulla mia media generale?",
      answer: "L'impatto dipende dal peso assegnato nel programma. Formula: Variazione = (Voto Esame - Voto Attuale) × (Peso Esame ÷ Peso Valutato). Un esame finale con peso del 30–40% provocherà una variazione molto maggiore rispetto a un test del 5%."
    },
    {
      question: "Come si calcola il GPA universitario su scala 4.0?",
      answer: "Il GPA si calcola moltiplicando i crediti formativi di ciascun corso per i punti del voto ottenuto (es. A = 4.0, B = 3.0, C = 2.0), sommando questi punti di qualità e dividendo per il totale dei crediti tentati."
    },
    {
      question: "Come si calcola il GPA cumulativo su più semestri?",
      answer: "Il GPA cumulativo è una media ponderata sui crediti: GPA Cumulativo = Punti Totali ÷ Crediti Totali Cumulati. I semestri con più crediti incidono maggiormente sul voto finale di laurea."
    },
    {
      question: "Come si calcola il CGPA indiano su scala da 10 punti?",
      answer: "Secondo le linee guida CBCS di UGC e AICTE, si calcola come: CGPA = Σ(Punti Voto × Crediti) ÷ Σ(Crediti), con valutazioni che vanno da O (10 punti) a F (0 punti)."
    },
    {
      question: "Qual è la differenza tra SGPA e CGPA?",
      answer: "L'SGPA misura il rendimento accademico di un singolo semestre, mentre il CGPA rappresenta la media ponderata sui crediti di tutti i semestres completati durante il corso di studi."
    },
    {
      question: "Come convertire un CGPA da 10 punti in percentuale?",
      answer: "Secondo lo standard AICTE e CBSE, la formula è: Percentuale (%) = CGPA × 9.5. Il nostro calcolatore supporta anche le formule istituzionali di specifiche università."
    },
    {
      question: "Come funziona il pianificatore di obiettivo GPA / CGPA?",
      answer: "Inserendo la media attuale, i crediti completati e l'obiettivo di laurea, calcola la media esatta di GPA o SGPA da mantenere nei crediti residui."
    },
    {
      question: "Come funziona la funzione per scartare il voto più basso?",
      answer: "Se il docente prevede lo scarto del voto peggiore, il calcolatore individua automaticamente il punteggio più basso di quella categoria, lo esclude e ricalcola la media con i voti rimanenti."
    }
  ]
};
