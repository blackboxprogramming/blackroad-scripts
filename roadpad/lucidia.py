"""
Lucidia - BlackRoad OS AI Interface.

Wraps Claude/Copilot/Ollama with custom Lucidia branding.
This IS the interface. Not Claude Code. Not Copilot. Lucidia.
"""

import os
import sys
import subprocess
import threading
import json
from datetime import datetime
from dataclasses import dataclass
from typing import Callable, List, Dict, Any

# ═══════════════════════════════════════════════════════════════════════════════
# LUCIDIA BRANDING
# ═══════════════════════════════════════════════════════════════════════════════

LOGO_LARGE = """\
  ██╗     ██╗   ██╗ ██████╗██╗██████╗ ██╗ █████╗
  ██║     ██║   ██║██╔════╝██║██╔══██╗██║██╔══██╗
  ██║     ██║   ██║██║     ██║██║  ██║██║███████║
  ██║     ██║   ██║██║     ██║██║  ██║██║██╔══██║
  ███████╗╚██████╔╝╚██████╗██║██████╔╝██║██║  ██║
  ╚══════╝ ╚═════╝  ╚═════╝╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝"""

ROBOT_FACE = """\
   >─╮
    ▣═▣
    ● ●"""

ROBOT_FULL = """\
     ╭─╮ ╭─╮
     ╰─╯ ╰─╯
       ▒▔▔▒
     ╭─────╮
     │ ░░░ │
     ╰─┬─┬─╯
       │ │
      ╱ | ╲"""

ROBOT_MINI = """\
   >─╮
    ▣═▣
   - - -
    ● ●"""

LAYERS_BOOT = """\
  + Layer 3 (agents/system) loaded
  + Layer 4 (deploy/orchestration) loaded
  + Layer 5 (branches/environments) loaded
  + Layer 6 (Lucidia core/memory) loaded
  + Layer 7 (orchestration) loaded
  + Layer 8 (network/API) loaded"""

# Box drawing
def box(content: List[str], width: int = 80, title: str = "") -> List[str]:
    """Draw a box around content."""
    lines = []
    inner = width - 2

    # Top
    if title:
        pad = inner - len(title) - 2
        lines.append(f"╭─ {title} " + "─" * pad + "╮")
    else:
        lines.append("╭" + "─" * inner + "╮")

    # Content
    for line in content:
        if len(line) > inner:
            line = line[:inner-1] + "…"
        lines.append("│" + line + " " * (inner - len(line)) + "│")

    # Bottom
    lines.append("╰" + "─" * inner + "╯")

    return lines


def header_box(version: str = "0.1.0", model: str = "Lucidia", directory: str = "~") -> List[str]:
    """Create the main header box."""
    content = [
        f"         >_ Road Code (v{version})",
        "",
        f"         model:     {model}        /model to change",
        f"         directory: {directory}",
    ]
    return box(content, width=56)


def welcome_screen(last_login: str = None) -> str:
    """Generate full welcome screen."""
    if not last_login:
        last_login = datetime.now().strftime("%b %d %Y %H:%M")

    lines = [
        "",
        LOGO_LARGE,
        "",
        "  BlackRoad OS, Inc. | AI-Native",
        "",
    ]

    # Robot with info
    lines.extend([
        "╭" + "─" * 46 + "╮",
        "│                                              │",
        "│   >─╮    BlackRoad OS, Inc.                  │",
        "│    ▣═▣                                       │",
        f"│    ● ●   Last Login: {last_login:<20}   │",
        "│                                              │",
        "╰" + "─" * 46 + "╯",
        "",
    ])

    # Layer boot
    lines.append("  ✓ BlackRoad CLI v3 → br-help")
    lines.extend(LAYERS_BOOT.split("\n"))
    lines.append("")

    return "\n".join(lines)


def prompt_box(model: str = "Lucidia", version: str = "0.1.0", cwd: str = "~") -> str:
    """Generate the prompt area."""
    lines = [
        "╭" + "─" * 94 + "╮",
        "│" + " " * 94 + "│",
        "│   BlackRoad OS, Inc. | AI-Native" + " " * 60 + "│",
        "│    ▣═▣  Lucidia by BlackRoad OS, Inc." + " " * 56 + "│",
        "│    ╰─     Describe a task to get started." + " " * 52 + "│",
    ]

    # Inner box
    inner = [
        f"│       ╭{'─' * 52}╮" + " " * 38 + "│",
        f"│       │         >_ Road Code (v{version})" + " " * (52 - 26 - len(version)) + "│" + " " * 38 + "│",
        "│       │" + " " * 52 + "│" + " " * 38 + "│",
        f"│       │         model:     {model}" + " " * (52 - 20 - len(model)) + "│" + " " * 38 + "│",
        f"│       │         directory: {cwd}" + " " * (52 - 22 - len(cwd)) + "│" + " " * 38 + "│",
        f"│       ╰{'─' * 52}╯" + " " * 38 + "│",
    ]
    lines.extend(inner)

    lines.extend([
        "│" + " " * 94 + "│",
        "│  Pick a model with /model. Copilot uses AI, so always check for mistakes." + " " * 19 + "│",
        "╰" + "─" * 94 + "╯",
    ])

    return "\n".join(lines)


# ═══════════════════════════════════════════════════════════════════════════════
# MODEL DEFINITIONS
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class Model:
    """An AI model."""
    name: str
    id: str
    provider: str  # claude, copilot, ollama, openai
    description: str
    command: List[str]
    reasoning_levels: List[str] = None

    def __post_init__(self):
        if self.reasoning_levels is None:
            self.reasoning_levels = ["low", "medium", "high"]


MODELS = {
    "lucidia": Model(
        name="Lucidia",
        id="lucidia",
        provider="claude",
        description="BlackRoad OS native intelligence",
        command=["claude", "--dangerously-skip-permissions"]
    ),
    "claude": Model(
        name="Claude Opus 4.5",
        id="claude-opus-4-5-20251101",
        provider="claude",
        description="Anthropic frontier model",
        command=["claude"]
    ),
    "copilot": Model(
        name="GitHub Copilot",
        id="copilot",
        provider="copilot",
        description="GitHub AI assistant",
        command=["gh", "copilot", "suggest", "-t", "shell"]
    ),
    "ollama": Model(
        name="Ollama Local",
        id="llama3.2",
        provider="ollama",
        description="Local LLM inference",
        command=["ollama", "run", "llama3.2"]
    ),
    "cecilia": Model(
        name="Cecilia (Hailo-8)",
        id="cecilia",
        provider="ollama",
        description="Edge AI on Cecilia Pi",
        command=["ssh", "cecilia", "ollama", "run", "llama3.2"]
    ),
}


# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE WRAPPER
# ═══════════════════════════════════════════════════════════════════════════════

class ClaudeWrapper:
    """Wraps Claude CLI as subprocess with Lucidia UI."""

    def __init__(self, model: str = "lucidia"):
        self.model = MODELS.get(model, MODELS["lucidia"])
        self.process: subprocess.Popen = None
        self.running = False
        self.output_buffer: List[str] = []
        self.on_output: Callable[[str], None] = None
        self.cwd = os.getcwd()

    def start(self) -> bool:
        """Start Claude subprocess."""
        try:
            # Build command
            cmd = self.model.command.copy()

            self.process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                cwd=self.cwd
            )
            self.running = True

            # Start reader thread
            self._reader = threading.Thread(target=self._read_output, daemon=True)
            self._reader.start()

            return True
        except Exception as e:
            print(f"Failed to start: {e}")
            return False

    def _read_output(self):
        """Read output from Claude."""
        while self.running and self.process:
            try:
                line = self.process.stdout.readline()
                if line:
                    self.output_buffer.append(line.rstrip())
                    if self.on_output:
                        self.on_output(line.rstrip())
                elif self.process.poll() is not None:
                    self.running = False
                    break
            except:
                break

    def send(self, text: str) -> None:
        """Send input to Claude."""
        if self.process and self.process.stdin:
            try:
                self.process.stdin.write(text + "\n")
                self.process.stdin.flush()
            except:
                pass

    def stop(self) -> None:
        """Stop Claude subprocess."""
        self.running = False
        if self.process:
            self.process.terminate()
            try:
                self.process.wait(timeout=2)
            except:
                self.process.kill()

    def get_output(self) -> List[str]:
        """Get and clear output buffer."""
        output = self.output_buffer.copy()
        self.output_buffer.clear()
        return output


# ═══════════════════════════════════════════════════════════════════════════════
# LUCIDIA SHELL
# ═══════════════════════════════════════════════════════════════════════════════

class LucidiaShell:
    """Interactive Lucidia shell with Claude backend."""

    def __init__(self):
        self.claude = None
        self.model = "lucidia"
        self.running = False
        self.history: List[str] = []
        self.cwd = os.getcwd()

    def boot(self) -> None:
        """Display boot sequence."""
        print(welcome_screen())

    def select_model(self) -> str:
        """Interactive model selector."""
        print("\n  Select Model")
        print("  " + "─" * 60)

        models = list(MODELS.items())
        for i, (key, model) in enumerate(models):
            marker = "›" if key == self.model else " "
            print(f"  {marker} {i+1}. {model.name:20} {model.description}")

        print("\n  Press number to select or Enter to keep current")

        try:
            choice = input("  > ").strip()
            if choice.isdigit():
                idx = int(choice) - 1
                if 0 <= idx < len(models):
                    self.model = models[idx][0]
                    print(f"\n  ✓ Selected: {MODELS[self.model].name}")
        except:
            pass

        return self.model

    def show_prompt(self) -> None:
        """Show the prompt UI."""
        home = os.path.expanduser("~")
        cwd = self.cwd.replace(home, "~")

        print(f"\n   >─╮    {MODELS[self.model].name}")
        print(f"    ▣═▣   {cwd}")
        print(f"    ● ●")

    def handle_command(self, cmd: str) -> bool:
        """Handle slash commands. Returns True if handled."""
        if cmd == "/model":
            self.select_model()
            return True
        elif cmd == "/new":
            self.history.clear()
            print("\n  ✓ Started new session")
            return True
        elif cmd == "/help":
            print("\n  Commands:")
            print("    /model   - Select model")
            print("    /new     - New session")
            print("    /quit    - Exit")
            print("    /layers  - Show loaded layers")
            return True
        elif cmd == "/layers":
            print(LAYERS_BOOT)
            return True
        elif cmd in ("/quit", "/exit", "/q"):
            self.running = False
            return True
        return False

    def run(self) -> None:
        """Run the Lucidia shell."""
        self.boot()
        self.running = True

        # Start Claude
        self.claude = ClaudeWrapper(self.model)
        if not self.claude.start():
            print("  ✗ Failed to start AI backend")
            return

        print("\n  ✓ Lucidia ready")

        while self.running:
            self.show_prompt()

            try:
                user_input = input("\n  › ").strip()
            except (EOFError, KeyboardInterrupt):
                print("\n")
                break

            if not user_input:
                continue

            # Check for commands
            if user_input.startswith("/"):
                if self.handle_command(user_input):
                    continue

            # Send to Claude
            self.history.append(user_input)
            self.claude.send(user_input)

            # Print robot thinking
            print("\n    ▣═▣ ···")

            # Wait for and display response
            import time
            time.sleep(0.5)  # Give Claude time to start responding

            while True:
                output = self.claude.get_output()
                if output:
                    for line in output:
                        # Filter out Claude Code's own UI elements
                        if not any(skip in line for skip in ["╭", "╰", "│", "thinking", ">"]):
                            print(f"    {line}")

                if not self.claude.running:
                    break

                # Check if more output coming
                time.sleep(0.1)
                if not self.claude.output_buffer:
                    break

        self.claude.stop()
        print("\n  ╰─ Goodbye from Lucidia\n")


# ═══════════════════════════════════════════════════════════════════════════════
# ENTRY POINT
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    """Main entry point."""
    shell = LucidiaShell()
    shell.run()


if __name__ == "__main__":
    main()
