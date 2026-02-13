// Mapping of image paths to asset imports
import books1 from '../assets/images/books-1.png';
import firstAiTasks from '../assets/images/50-first-ai-tasks.jpg';
import architectureArticle from '../assets/images/ARCHITECTURE_md_---_article.jpg';
import backlogArticle from '../assets/images/BACKLOG_md_---_article.jpg';
import backlogArticle1 from '../assets/images/BACKLOG_md_---_article-1.jpg';
import copilotInstructions from '../assets/images/copilot-instructions_md_---_article.jpg';
import copilotStep02 from '../assets/images/copilot-instructions-step02-3.gif';
import copilotStep04Execute from '../assets/images/copilot-instructions-step04-execute.gif';
import copilotStep04Plan from '../assets/images/copilot-instructions-step04-plan.gif';
import copilotStep04Review from '../assets/images/copilot-instructions-step04-review.gif';
import initNodeProject from '../assets/images/init-node-project_md_---_article.jpg';
import screenshot from '../assets/images/Screenshot_2025-07-11__12_40.jpg';
import taskWrapUp from '../assets/images/task-wrap-up.jpg';

export const imageMap: Record<string, any> = {
	'/content/images/2026/02/books-1.png': books1,
	'/content/images/2026/02/50-first-ai-tasks.jpg': firstAiTasks,
	'/content/images/2026/02/ARCHITECTURE_md_---_article.jpg': architectureArticle,
	'/content/images/2026/02/BACKLOG_md_---_article.jpg': backlogArticle,
	'/content/images/2026/02/BACKLOG_md_---_article-1.jpg': backlogArticle1,
	'/content/images/2026/02/copilot-instructions_md_---_article.jpg': copilotInstructions,
	'/content/images/2026/02/copilot-instructions-step02-3.gif': copilotStep02,
	'/content/images/2026/02/copilot-instructions-step04-execute.gif': copilotStep04Execute,
	'/content/images/2026/02/copilot-instructions-step04-plan.gif': copilotStep04Plan,
	'/content/images/2026/02/copilot-instructions-step04-review.gif': copilotStep04Review,
	'/content/images/2026/02/init-node-project_md_---_article.jpg': initNodeProject,
	'/content/images/2026/02/Screenshot_2025-07-11__12_40.jpg': screenshot,
	'/content/images/2026/02/task-wrap-up.jpg': taskWrapUp,
};

export function getImageAsset(path: string | undefined): any {
	if (!path) return undefined;
	return imageMap[path] || path;
}
