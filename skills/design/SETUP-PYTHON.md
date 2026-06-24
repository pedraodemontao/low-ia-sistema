# Dependências Python da skill `design`

Os scripts de geração (logo/ícone/CIP em `scripts/`) usam Python 3.9+ e a API do Gemini.
O venv NÃO é versionado — recrie localmente:

```bash
cd skills/design
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Defina a chave do Gemini no ambiente antes de gerar imagens:

```bash
export GEMINI_API_KEY="sua-chave"
```

As skills `ui-ux-pro-max`, `design-system`, `brand` e `banner-design` são mais leves
e não exigem este venv (rodam com Python stdlib + Node, exceto onde o próprio SKILL.md pedir).
