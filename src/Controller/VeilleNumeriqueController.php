<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class VeilleNumeriqueController extends AbstractController
{
    #[Route('/veille/numerique', name: 'app_veille_numerique')]
    public function index(): Response
    {
        // URL du flux RSS
        $rssUrl = 'https://www.francetvinfo.fr/internet/securite-sur-internet.rss'; // Remplace par ton URL de flux RSS

        // Charger et analyser le flux RSS
        try {
            $rssContent = simplexml_load_file($rssUrl);
            $articles = [];

            if ($rssContent !== false) {
                // Parcourir les éléments du flux (souvent <item> pour RSS)
                foreach ($rssContent->channel->item as $item) {
                    $articles[] = [
                        'title' => (string) $item->title,
                        'link' => (string) $item->link,
                        'description' => (string) $item->description,
                        'pubDate' => (string) $item->pubDate,
                    ];
                }
            }
        } catch (\Exception $e) {
            $articles = []; // Si une erreur survient, la liste reste vide
        }

        // Rendre le template avec les articles
        return $this->render('veille_numerique/index.html.twig', [
            'controller_name' => 'VeilleNumeriqueController',
            'articles' => $articles,
        ]);
    }
}
