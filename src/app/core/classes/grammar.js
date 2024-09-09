class Grammar{

    constructor(){
        this.terminais = [];
        this.naoTerminais = [];
        this.naoTerminais['S'] = [];
    }

    isValid(){
        if(this.terminais.length == 0) return false;
        for(const n of Object.keys(this.naoTerminais)){
            if(this.naoTerminais[n].length == 0) return false;
        }
    
        return true;
    }
    
    addNaoTerminal(n){
        if(!this.naoTerminais[n]){
            this.naoTerminais[n] = []
        }
    }
    
    addTerminal(t){
        if(!this.terminais.includes(t)){
            this.terminais.push(t);
        }
    }

    clearTerminal(){
        this.terminais = [];
    }
    
    addProducao(n, p){
        if(this.isProducaoValida(p)){
            this.naoTerminais[n].push(p);
        }
        else{
            console.log(`Produção inválida: ${p}`);
        }
    }
    
    isProducaoValida(p){
        const values = p === null ? [null] : Array.from(p);
    
        values.map(x => {
            if(!this.terminais.includes(x) && !this.naoTerminais[x]){
                return false
            }
        });
    
        return true;
    }
    
    randomSelect(n){
        if(!this.naoTerminais[n]){
            console.error("Não terminal inválido!");
            return;
        }
    
        const max = this.naoTerminais[n].length - 1;
        const index = Math.floor(Math.random() * (max + 1));
        return this.naoTerminais[n][index];
    }
    
    buildSentence(){
        if(!this.isValid()) return;
    
        const saida = [];
        const pilha = [];
        
        var initial = this.randomSelect('S');
        initial = initial === null ? [null] : Array.from(initial);
        
        while(initial.length > 0){
            pilha.unshift(initial.pop());
        }
    
        while(pilha.length > 0){
            const value = pilha.shift();
            if(value === null)
                continue;
            if(this.terminais.includes(value)){
                saida.push(value);
                continue;
            }
    
            var newValues = this.randomSelect(value);
            newValues = newValues === null ? [null] : Array.from(newValues);
            while(newValues.length > 0){
                pilha.unshift(newValues.pop());
            }
        }

        return saida;
    }
}

export default Grammar;

// const gramatica = new Gramar();

// gramatica.addTerminal('1');
// gramatica.addTerminal('2');
// gramatica.addTerminal(null);
// gramatica.addProducao('S', '1S');
// gramatica.addProducao('S', '2S');
// gramatica.addProducao('S', null);

// console.log(gramatica.buildSentence());
