import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: number;
  title: string;
  players: string;
  image: string;
  category: string;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Speed Rush',
    players: '1-4',
    image: 'https://cdn.poehali.dev/files/f9557258-8bc9-4cc7-be8e-b52cdb9b21f2.jpg',
    category: 'Гонки'
  },
  {
    id: 2,
    title: 'Ring Quest',
    players: '1-2',
    image: 'https://cdn.poehali.dev/files/f9557258-8bc9-4cc7-be8e-b52cdb9b21f2.jpg',
    category: 'Приключения'
  },
  {
    id: 3,
    title: 'Turbo Battle',
    players: '2-8',
    image: 'https://cdn.poehali.dev/files/f9557258-8bc9-4cc7-be8e-b52cdb9b21f2.jpg',
    category: 'Батл'
  },
  {
    id: 4,
    title: 'Green Hill Adventure',
    players: '1-4',
    image: 'https://cdn.poehali.dev/files/f9557258-8bc9-4cc7-be8e-b52cdb9b21f2.jpg',
    category: 'Платформер'
  }
];

export default function Index() {
  const [showLobby, setShowLobby] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const { toast } = useToast();

  const createLobby = () => {
    if (!playerName) {
      toast({
        title: 'Укажи имя игрока',
        description: 'Введи своё имя, чтобы создать лобби',
        variant: 'destructive'
      });
      return;
    }
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setLobbyCode(code);
    toast({
      title: 'Лобби создано! 🎮',
      description: `Код для друзей: ${code}`
    });
  };

  const joinLobby = () => {
    if (!playerName || !lobbyCode) {
      toast({
        title: 'Заполни все поля',
        description: 'Введи имя и код лобби',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Подключение к лобби...',
      description: `Код: ${lobbyCode}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-sonic-blue to-secondary">
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-sonic-gold to-accent rounded-full flex items-center justify-center animate-bounce-slow">
              <Icon name="Zap" size={24} className="text-sonic-blue" />
            </div>
            <h1 className="text-3xl font-black text-white">SONIC ARENA</h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30 hover-scale"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Главная
            </Button>
            <Button
              variant="outline"
              className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30 hover-scale"
            >
              <Icon name="Gamepad2" size={20} className="mr-2" />
              Игры
            </Button>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
            СКОРОСТЬ • ПРИКЛЮЧЕНИЯ • ПОБЕДА
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Играй с друзьями онлайн в самые крутые игры
          </p>
          <Button
            size="lg"
            onClick={() => setShowLobby(true)}
            className="bg-gradient-to-r from-accent via-sonic-gold to-accent text-foreground font-bold text-xl px-12 py-6 rounded-full hover-scale animate-pulse-soft shadow-2xl"
          >
            <Icon name="Users" size={28} className="mr-3" />
            ИГРАТЬ С ДРУЗЬЯМИ
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {games.map((game, index) => (
            <Card
              key={game.id}
              className="game-card overflow-hidden border-4 border-white/30 bg-white/95 backdrop-blur animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-secondary text-white font-bold">
                  {game.category}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-black text-primary mb-2">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Users" size={18} />
                    <span className="font-semibold">{game.players} игроков</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 font-bold rounded-full hover-scale"
                  >
                    ИГРАТЬ
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white/10 backdrop-blur-lg border-y border-white/20 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="w-20 h-20 bg-gradient-to-br from-sonic-gold to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Молниеносная игра</h3>
              <p className="text-white/80">Без задержек и лагов</p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Игра с друзьями</h3>
              <p className="text-white/80">До 8 игроков онлайн</p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trophy" size={40} className="text-sonic-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Турниры</h3>
              <p className="text-white/80">Соревнуйся за призы</p>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={showLobby} onOpenChange={setShowLobby}>
        <DialogContent className="bg-gradient-to-br from-white to-blue-50 border-4 border-primary">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-primary flex items-center gap-3">
              <Icon name="Users" size={32} />
              Онлайн Лобби
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Твоё имя
              </label>
              <Input
                placeholder="Введи своё имя"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="border-2 border-primary/30 focus:border-primary font-semibold"
              />
            </div>

            <div className="border-t-2 border-dashed border-primary/30 pt-4">
              <h4 className="font-bold text-foreground mb-3">Создать новое лобби</h4>
              <Button
                onClick={createLobby}
                className="w-full bg-gradient-to-r from-primary to-sonic-blue text-white font-bold hover-scale"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Создать лобби
              </Button>
              {lobbyCode && (
                <div className="mt-4 p-4 bg-accent/20 rounded-lg border-2 border-accent">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Код для друзей:
                  </p>
                  <p className="text-3xl font-black text-primary">{lobbyCode}</p>
                </div>
              )}
            </div>

            <div className="border-t-2 border-dashed border-primary/30 pt-4">
              <h4 className="font-bold text-foreground mb-3">Присоединиться к лобби</h4>
              <Input
                placeholder="Введи код лобби"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                className="border-2 border-primary/30 focus:border-primary font-semibold mb-3"
              />
              <Button
                onClick={joinLobby}
                variant="outline"
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold hover-scale"
              >
                <Icon name="LogIn" size={20} className="mr-2" />
                Присоединиться
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-foreground/10 backdrop-blur-md border-t border-white/20 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 font-semibold">
            © 2024 SONIC ARENA • Играй быстро, побеждай первым
          </p>
        </div>
      </footer>
    </div>
  );
}
