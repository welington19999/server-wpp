// Script para testar a função de bloqueio
// Simula a função isNumberBlocked para testes

function isNumberBlocked(numero) {
    // Simular a config com números bloqueados para teste
    const config = {
        blockedNumbers: [
            '+55 65 99999-9999',
            '11987654321',
            '+55 (11) 9 8765-4321',
            '5585988776655'
        ]
    };
    
    if (!config.blockedNumbers || config.blockedNumbers.length === 0) {
        return false;
    }
    
    // Normalizar número do WhatsApp: remover @c.us e limpar
    const numeroLimpo = numero.replace(/\D/g, '').slice(-11); // Remove tudo que não é dígito e pega últimos 11
    
    console.log(`\n🔍 VERIFICANDO BLOQUEIO:`);
    console.log(`📞 Número original: ${numero}`);
    console.log(`🔢 Número normalizado (últimos 11 dígitos): ${numeroLimpo}`);
    console.log(`📋 Números bloqueados na lista:`, config.blockedNumbers);
    
    for (const blocked of config.blockedNumbers) {
        // Limpar o número bloqueado: remove espaços, +, traços, parênteses
        const blockedLimpo = blocked.replace(/\D/g, '').slice(-11); // Mesmo tratamento: últimos 11
        
        console.log(`   Comparando: "${numeroLimpo}" com "${blockedLimpo}" (original: "${blocked}")`);
        
        // Comparação EXATA dos últimos 11 dígitos (DDD + 9 dígitos)
        if (numeroLimpo === blockedLimpo) {
            console.log(`   ✅ BLOQUEADO! Match encontrado!`);
            return true;
        }
        
        // Alternativa: comparar apenas os 9 últimos dígitos (sem DDD)
        // Útil se o usuário adicionou sem DDD
        if (numeroLimpo.length >= 9 && blockedLimpo.length >= 9) {
            const finalNumero = numeroLimpo.slice(-9); // últimos 9 dígitos
            const finalBlocked = blockedLimpo.slice(-9);
            
            if (finalNumero === finalBlocked) {
                console.log(`   ✅ BLOQUEADO! Match nos últimos 9 dígitos: ${finalNumero}`);
                return true;
            }
        }
    }
    
    console.log(`   ❌ NÃO bloqueado`);
    return false;
}

// Testes
console.log('\n========== TESTES DE BLOQUEIO ==========\n');

// Teste 1: Número com formatação completa
console.log('TESTE 1: Número do WhatsApp com formatação completa');
console.log('Resultado:', isNumberBlocked('556599999999@c.us') ? '✅ BLOQUEADO' : '❌ NÃO BLOQUEADO');

// Teste 2: Número sem DDD (apenas últimos 9)
console.log('\n\nTESTE 2: Número do WhatsApp (último teste da lista)');
console.log('Resultado:', isNumberBlocked('5585988776655@c.us') ? '✅ BLOQUEADO' : '❌ NÃO BLOQUEADO');

// Teste 3: Número não bloqueado
console.log('\n\nTESTE 3: Número que NÃO está na lista');
console.log('Resultado:', isNumberBlocked('5511912345678@c.us') ? '✅ BLOQUEADO' : '❌ NÃO BLOQUEADO');

// Teste 4: Segundo número formatado
console.log('\n\nTESTE 4: Segundo número da lista (11987654321)');
console.log('Resultado:', isNumberBlocked('5511987654321@c.us') ? '✅ BLOQUEADO' : '❌ NÃO BLOQUEADO');

// Teste 5: Terceiro número com muita formatação
console.log('\n\nTESTE 5: Terceiro número com muita formatação na lista');
console.log('Resultado:', isNumberBlocked('5511987654321@c.us') ? '✅ BLOQUEADO' : '❌ NÃO BLOQUEADO');
