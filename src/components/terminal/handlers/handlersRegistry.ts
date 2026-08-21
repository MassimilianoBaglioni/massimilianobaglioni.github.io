import AboutRenderer, { aboutHandler } from '../renderers/AboutRenderer';
import CommandLineRenderer, { commandLineHandler } from '../renderers/CommandLineRenderer';
import EchoRenderer, { echoHandler } from '../renderers/EchoRenderer';
import WelcomeRenderer, { welcomeHandler } from '../renderers/WelcomeRenderer';
import InstructionRenderer, { instructionHandler } from '../renderers/InstructionRenderer';
import ProjectsRenderer, { projectsHandler } from '../renderers/ProjectsRenderer';
import WorkRenderer, { workHandler } from '../renderers/WorkRenderer';

export type ProcessedItem = {
  kind: string;
  data: unknown;
};

export type CommandHandler = (kind: string, rawText: string) => ProcessedItem;

export const commandsRegistry: Record<string, CommandHandler> = {
  about: aboutHandler,
  echo: echoHandler,
  echoLine: commandLineHandler,
  welcome: welcomeHandler,
  instruction: instructionHandler,
  project: projectsHandler,
  projects: projectsHandler,
  work: workHandler,
  experience: workHandler,
};

export const renderesRegistry: Record<string, React.FC<{ data: unknown }>> = {
  about: AboutRenderer,
  echo: EchoRenderer,
  echoLine: CommandLineRenderer,
  welcome: WelcomeRenderer,
  instruction: InstructionRenderer,
  project: ProjectsRenderer,
  projects: ProjectsRenderer,
  work: WorkRenderer,
  experience: WorkRenderer,
};
