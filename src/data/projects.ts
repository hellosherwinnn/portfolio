export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectSection {
  title: string;
  paragraphs: string[];
}

export interface ProjectCaseStudy {
  slug: string;
  order: number;
  title: string;
  shortTitle: string;
  category: string[];
  summary: string;
  role: string;
  period: string;
  metrics: ProjectMetric[];
  technologies: string[];
  visual: 'bakery' | 'traffic' | 'speech';
  flow: string[];
  sections: ProjectSection[];
  repository?: string;
  repositoryLabel?: string;
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'bakery-ai-analytics',
    order: 1,
    title: 'Bakery AI Analytics Platform',
    shortTitle: 'Bakery AI Analytics',
    category: ['Applied AI', 'Data workflows', 'Forecasting'],
    summary: 'An AI-assisted analytics workflow combining multi-source sales data, dashboards, natural-language analysis, and forecasting.',
    role: 'Freelance AI & Data Engineer',
    period: '2025',
    metrics: [
      { value: '~116K', label: 'sales transactions' },
      { value: '7', label: 'data sources' },
      { value: '14.4%', label: 'weighted forecast error (WMAPE)' },
    ],
    technologies: ['Python', 'LangChain', 'LangGraph', 'XGBoost', 'SARIMA', 'Prophet', 'Streamlit'],
    visual: 'bakery',
    flow: ['Data sources', 'Analytics layer', 'AI assistant', 'Forecast + dashboard'],
    sections: [
      {
        title: 'Summary',
        paragraphs: ['This project brought sales data, analysis, forecasting, and natural-language assistance into one repeatable workflow. It was designed around approximately 116,000 sales transactions from 7 data sources, with a Streamlit dashboard for business monitoring and a seven-day net-profit forecast.'],
      },
      {
        title: 'Context',
        paragraphs: ['The work was completed as a freelance AI and data engineering project. The source data came from multiple business systems, so analysis and reporting first needed a dependable, repeatable foundation.'],
      },
      {
        title: 'Problem',
        paragraphs: ['Fragmented inputs made it difficult to produce consistent analysis, reporting, and forecasting. The task was to connect data collection and preparation with business-facing views and AI-assisted analysis without treating the dashboard or forecast as isolated outputs.'],
      },
      {
        title: 'My role',
        paragraphs: ['I built the data workflow, analytics assistant, forecasting pipeline, and dashboard. My work included collection, cleaning, analysis, natural-language workflow design, and the delivery of centralized business monitoring.'],
      },
      {
        title: 'Approach',
        paragraphs: ['The project narrative was: fragmented data → repeatable data foundation → analytics layer → AI layer → forecasting → dashboard. This sequence kept data preparation connected to the downstream reporting and forecasting decisions it supports.'],
      },
      {
        title: 'Implementation',
        paragraphs: ['I automated collection, cleaning, and analysis across the seven sources. Python, LangChain, and LangGraph supported an LLM-powered analytics assistant for natural-language analysis, forecasting, and recurring business reporting. The Streamlit dashboard centralized 4 key business KPIs, 13 business visualizations, and interactive filters. For forecasting, I evaluated XGBoost alongside SARIMA and Prophet for a seven-day net-profit forecast using 500 daily observations.'],
      },
      {
        title: 'Results',
        paragraphs: ['The resulting workflow created a repeatable data foundation for business analysis and reporting across the verified transaction volume. It provided a centralized view of sales and performance. The selected XGBoost model achieved 14.4% weighted forecast error (WMAPE).'],
      },
      {
        title: 'Reflection',
        paragraphs: ['The project reinforced that an AI layer is most useful when it is grounded in a traceable data workflow and clear business metrics. It also showed the value of connecting data preparation, visual analysis, and forecasting in one system rather than handling each as a separate task.'],
      },
      {
        title: 'Public repository and privacy',
        paragraphs: ['A public GitHub repository presents the project workflow and architecture only. The client-specific implementation, source data, dashboard details, company and product names, customer identifiers, order IDs, employee names, and other identifying business information remain private.'],
      },
    ],
    repository: 'https://github.com/hellosherwinnn/bakery-graph',
    repositoryLabel: 'View public workflow repository',
  },
  {
    slug: 'road-traffic-auralization',
    order: 2,
    title: 'Plausible Road Traffic Auralization',
    shortTitle: 'Road Traffic Auralization',
    category: ['Engineering simulation', 'Python automation', 'Audio'],
    summary: 'An automated workflow linking microscopic traffic simulation, trajectory processing, acoustic simulation, audio processing, and evaluation.',
    role: "Master's thesis",
    period: '2023–2024',
    metrics: [
      { value: '288', label: 'simulation cases' },
      { value: '4 × 6 × 6 × 2', label: 'parameter matrix' },
      { value: '1 command', label: 'automated workflow' },
    ],
    technologies: ['Python', 'MATLAB', 'Lua', 'SUMO', 'RAVEN', 'Pigeon', 'lxml', 'SciPy', 'Artemis SUITE', 'Reaper', 'Blender', 'SketchUp'],
    visual: 'traffic',
    flow: ['SUMO scenario', 'Trajectory transform', 'RAVEN / Pigeon', 'Audio evaluation'],
    sections: [
      {
        title: 'Summary',
        paragraphs: ["This master's thesis turned a multi-step road-traffic-to-audio process into a configurable workflow. It linked SUMO traffic simulation with trajectory processing and RAVEN/Pigeon acoustic simulation, then supported audio processing and evaluation through a one-command batch workflow."],
      },
      {
        title: 'Context',
        paragraphs: ['Plausible traffic auralization requires several tools and data transformations to work together. The project combined microscopic road-traffic simulation, geometric acoustic simulation, trajectory handling, audio processing, and perceptual evaluation.'],
      },
      {
        title: 'Problem',
        paragraphs: ['The original processing sequence involved multiple manual steps and repeated path adjustments. The engineering challenge was to make that sequence reproducible across traffic scenarios and parameter combinations while retaining control over the inputs to the acoustic workflow.'],
      },
      {
        title: 'My role',
        paragraphs: ['I developed the configurable Python pipeline and the surrounding processing automation. I prepared simulation inputs, integrated traffic and acoustic tools, automated trajectory and audio handling, and designed the parameter study and evaluation workflow.'],
      },
      {
        title: 'Approach',
        paragraphs: ['The workflow followed: traffic scenario → SUMO → trajectory processing → RAVEN/Pigeon → audio processing → evaluation. Separating the stages made it possible to configure inputs, run the complete chain in order, and evaluate variants systematically.'],
      },
      {
        title: 'Implementation',
        paragraphs: ['I built a Python road-traffic generator and added batch reading of CSV trajectories. The pipeline extracted SUMO Floating Car Data from XML with lxml, cleaned and transformed trajectories, calculated view vectors, and generated simulation-ready vehicle inputs. It interpolated trajectories from 0.1 s to 0.01 s and 0.005 s where required, centralized path handling, and used a control script for one-command execution.', 'I also automated sequential multi-vehicle workflows in RAVEN and Pigeon, used Lua in Reaper for fading and overlap operations, and used Python for audio cropping and multi-vehicle synthesis.'],
      },
      {
        title: 'Results',
        paragraphs: ['The experiment contained 288 simulation cases in a 4 × 6 × 6 × 2 matrix: 4 vehicle speeds, 6 update intervals, 6 overlap ratios, and 2 crossfading methods. Evaluation combined SPL temporal-derivative analysis, loudness and sharpness analysis with Artemis SUITE and ECMA-418-2 methods, and an informal listening experiment with 5 acoustics-experienced participants. The one-command workflow replaced the multi-step manual processing sequence for the configured cases.'],
      },
      {
        title: 'Reflection',
        paragraphs: ['The project showed that reliable research automation depends on explicit data transformations, centralized configuration, and a reproducible experiment design. It also connected software engineering choices to evaluation methods rather than treating the simulation pipeline as separate from the quality question.'],
      },
      {
        title: 'Relevant links',
        paragraphs: ['No public repository or media asset is published for this project. The system diagram on this page illustrates the verified workflow without representing unverified output as an experimental result.'],
      },
    ],
  },
  {
    slug: 'spoken-digit-cnn',
    order: 3,
    title: 'Spoken Digit Classification with CNNs',
    shortTitle: 'Spoken Digit CNNs',
    category: ['Machine learning', 'Speech', 'Real-time inference'],
    summary: 'MFCC-based spoken-digit classification using 1D and 2D CNNs, systematic model experiments, and later live-microphone validation.',
    role: "Bachelor's thesis",
    period: '2020–2021',
    metrics: [
      { value: '3,500', label: 'speech recordings' },
      { value: '1D + 2D', label: 'CNN families' },
      { value: '96.43%', label: 'held-out test-set accuracy' },
    ],
    technologies: ['Python', 'TensorFlow', 'Keras', 'librosa', 'PyAudio', 'CNNs', 'MFCC'],
    visual: 'speech',
    flow: ['Speech WAV', 'MFCC features', '1D / 2D CNN', 'Digit inference'],
    repository: 'https://github.com/hellosherwinnn/Digits-classification-by-using-CNN',
    repositoryLabel: 'View GitHub repository',
    sections: [
      {
        title: 'Summary',
        paragraphs: ["This bachelor's thesis compared MFCC-based 1D and 2D convolutional neural networks for spoken-digit classification. The dataset combined 3,000 recordings from the Free Spoken Digit Dataset with 500 self-recorded samples, for 3,500 recordings across digits 0–9."],
      },
      {
        title: 'Context',
        paragraphs: ['The work focused on model training and experiment comparison for speech classification. A practical microphone pipeline was added only after model selection, as a separate validation and inference stage.'],
      },
      {
        title: 'Problem',
        paragraphs: ['The task was to determine how MFCC preprocessing and CNN architecture choices affected spoken-digit classification, then make the selected models usable with live microphone input without confusing that later validation with the offline evaluation result.'],
      },
      {
        title: 'My role',
        paragraphs: ['I prepared the audio features, built and trained the 1D and 2D CNN models, designed the parameter experiments, selected the final models, and integrated the subsequent PyAudio microphone inference pipeline.'],
      },
      {
        title: 'Approach',
        paragraphs: ['The workflow was: audio → MFCC → 1D/2D CNN → parameter experiments → model selection → test-set evaluation → live microphone validation. Recordings were randomly split into 80% training data and 20% testing data, and the reported model results came from the held-out testing dataset.'],
      },
      {
        title: 'Implementation',
        paragraphs: ['I used librosa to extract 13 Mel-frequency cepstral coefficient features and standardized the feature shape for CNN input. With TensorFlow and Keras, I built and compared 1D and 2D CNN families while systematically evaluating learning rate, convolutional filter size, dropout, and network depth. After model selection, I used PyAudio to capture microphone input, extract MFCC features, run CNN inference, and continuously output the predicted digit.'],
      },
      {
        title: 'Results',
        paragraphs: ['The selected six-convolutional-layer 1D CNN reached 96.43% held-out test-set accuracy. This is an offline classification result from the testing dataset, not a live-microphone metric.'],
      },
      {
        title: 'Live microphone validation',
        paragraphs: ['After model selection, the microphone pipeline was validated separately with 200 live trials per model. The 1D CNN achieved 88.0% and the 2D CNN achieved 89.5% in those live-microphone trials. These separate validation results do not relabel the 96.43% held-out test-set result.'],
      },
      {
        title: 'Reflection',
        paragraphs: ['The work made clear why model-selection results and live-system validation need separate language and evaluation contexts. Systematic parameter experiments were useful not only for choosing a final model, but also for understanding how preprocessing and architecture choices affected training behavior.'],
      },
    ],
  },
];

export const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
