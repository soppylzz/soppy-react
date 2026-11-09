# Source study

Start with a concrete question and an observable trigger, such as the first render of a concurrent root. Trace one path from its public entry point. Follow the imports and feature flags for the chosen renderer and tag when upstream contains parallel implementations.

Cite the upstream tag, file path, and symbol for each key transition. Explain which phase it belongs to and what state changes there. Distinguish observations from reading the code and results from running an example.

For a simplified implementation, name the behavior it models and any omitted branches. Verify it with the smallest input that exhibits the behavior. Record how to run it, the expected result, and what was observed.
