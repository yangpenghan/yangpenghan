# 公开来源研究简报试点

这套材料用于判断 Agent 辅助是否值得进入日常研究简报流程。它只记录少量个人工作流数据，不用于因果推断、显著性检验或对外宣传“效率提升”。首轮同时改变了多项流程，结果不能归因于某一项 skill；只有在其余条件固定、单独改变 skill 的后续试验中，才可讨论该 skill 的增益。

## 产物与验收

每次任务交付一篇 **800–1200 汉字**的中文简报，开头写明研究问题和来源检索截止日期。正文至少使用 5 个当日可访问来源，其中至少 3 个是一手来源；列出 5 条可核查主张并逐条给出引用；将事实、推论、建议分开；主动呈现矛盾证据与限制。

验收分为事实、引用、覆盖、格式四项，四项都通过才记 `accepted=true`。任一项失败就记 `false`；尚未验收记 `unknown`。失败、重试和恢复成本都保留，不能删掉失败记录。

## 立即开始

1. 创建 Python 3.13 专用环境并安装冻结依赖：

   ```bash
   python3.13 -m venv .venv
   .venv/bin/python -m pip install -r requirements.lock
   ```

2. 开始前从 [protocol.md](protocol.md) 选定一对任务，登记条件顺序、`task_id`、检索截止日期、模型、工具、权限和 skill 版本。先做 W00 热身，但不把它放进正式比较。
3. 复制 `trials.template.csv` 为 `data/trials.csv`。未知时长留空；确实没有发生才写 `0`。真实个人记录位于忽略目录，不提交。
4. 运行检查与分析：

   ```bash
   .venv/bin/python -m pytest -q test_analysis.py
   mkdir -p outputs
   .venv/bin/python -c "from pathlib import Path; import nbformat; from nbclient import NotebookClient; source=Path('analysis.ipynb'); target=Path('outputs/analysis.executed.ipynb'); notebook=nbformat.read(source, 4); NotebookClient(notebook, timeout=600, kernel_name='python3', resources={'metadata': {'path': str(source.parent)}}).execute(); nbformat.write(notebook, target)"
   ```

   执行结果写入已忽略的 `outputs/analysis.executed.ipynb`，不会把私有表格保存进受版本控制的 `analysis.ipynb`。

5. 如果曾在 Jupyter 中交互执行或保存受版本控制的 `analysis.ipynb`，提交前清空其输出和执行序号：

   ```bash
   .venv/bin/python -c "from pathlib import Path; import nbformat; path=Path('analysis.ipynb'); notebook=nbformat.read(path, 4); [(cell.__setitem__('outputs', []), cell.__setitem__('execution_count', None)) for cell in notebook.cells if cell.cell_type == 'code']; nbformat.write(notebook, path)"
   ```

笔记本优先读取 `data/trials.csv`，文件不存在时读取空模板。默认不会用合成数据替代真实记录；没有记录时只显示“待采集”，不会生成数值图。字段定义见 [data-dictionary.md](data-dictionary.md)，任务与执行规则见 [protocol.md](protocol.md)。

## 结果边界

完整配对必须满足：人工与 Agent 两个条件各至少一次通过；该对全部尝试的五项人工阶段均已记录；同一条件的重试属于同一任务；两个条件任务不同；同一条件验收通过后没有继续尝试。不满足的配对单列原因，不进入节省百分比。人工基线为 0 时只展示绝对差，百分比保持未知。工具只做描述性汇总，不自动发布效率结论。

方法设计参考了 Scientific Agent Skills：Kassis, T., Agarwal, V., He, Y., Patel, D., & Brueckner, A. M. (2026). *Scientific Agent Skills: A Library of Procedural Knowledge for Research Agents*. arXiv:2609.00065. https://doi.org/10.48550/arXiv.2609.00065
