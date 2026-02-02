### Fluxo do usuário (React) 
**Instalação de Pacotes**: com o Node, vem o gerenciador de pacotes NPM, que irá lhe possibilitar baixar automaticamente os pacotes necessários para rodar o programa. Segue a linha de comando:
- **Instalar**: npm install

**Executar a versão DEV**: no "package.json", já foi deixado um script para a execução da aplicação. Segue a linha de comando:
- **Executar**: npm run dev

**USUARIOS SEED**:
- admin@domain.com senha: admin123 -> Cargo: Admin
- medic@domain.com senha: medic123 -> Cargo: Medic
- medic2@domain.com senha: medic2123 -> Cargo: Medic
- stake_holder@domain.com senha: stake_holder123 -> Cargo: Stake Holder

**Cargos**:
- **Admin**: Cadastrar, editar ou deletar pacientes; Atribuir ou desatribuir "familiares" (outros usuários) ao paciente; Criar, editar ou deletar o time responsável pelo paciente; Atribuir ou desatribuir médicos ao time; Atribuir ou desatribuir o médico lider ao time;
- **Medic**: Ver times que ele pertence; Cadastrar, editar ou deletar SUAS notas no time, pode ver as notas de outros médicos; Caso o médico for o líder do time, poderá editar o Laudo (Informação que o paciente e familiares terão acesso, não terão acesso a notas);
- **Stake Holder**: Irá ver apenas as informações e o LAUDO do paciente que está vinculado a ele.
